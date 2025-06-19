export interface ExternalCompoundInfo {
  commonName?: string;
  iupacName?: string;
  synonyms?: string[];
  molecularFormula?: string;
  molecularWeight?: number;
  category?: string;
}

// Cache to store previously fetched compound data
const compoundCache = new Map<string, ExternalCompoundInfo | null>();

/**
 * Normalize molecular formula for consistent lookup
 */
function normalizeFormula(formula: string): string {
  return formula.replace(/\s/g, '').toUpperCase();
}

/**
 * Fetch compound information from PubChem API
 */
async function fetchFromPubChem(formula: string): Promise<ExternalCompoundInfo | null> {
  try {
    // First, search for compounds by molecular formula
    const searchUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/formula/${encodeURIComponent(formula)}/cids/JSON`;
    const searchResponse = await fetch(searchUrl);
    
    if (!searchResponse.ok) {
      return null;
    }
    
    const searchData = await searchResponse.json();
    const cids = searchData?.IdentifierList?.CID;
    
    if (!cids || cids.length === 0) {
      return null;
    }
    
    // Get the first compound ID (most relevant)
    const cid = cids[0];
    
    // Fetch detailed information for the compound
    const detailUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/MolecularFormula,MolecularWeight,IUPACName/JSON`;
    const detailResponse = await fetch(detailUrl);
    
    if (!detailResponse.ok) {
      return null;
    }
    
    const detailData = await detailResponse.json();
    const properties = detailData?.PropertyTable?.Properties?.[0];
    
    if (!properties) {
      return null;
    }
    
    // Fetch synonyms (common names)
    const synonymUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`;
    const synonymResponse = await fetch(synonymUrl);
    
    let synonyms: string[] = [];
    if (synonymResponse.ok) {
      const synonymData = await synonymResponse.json();
      synonyms = synonymData?.InformationList?.Information?.[0]?.Synonym || [];
    }
    
    // Find the most common/recognizable name
    const commonName = findBestCommonName(synonyms, formula);
    
    return {
      commonName,
      iupacName: properties.IUPACName,
      synonyms: synonyms.slice(0, 10), // Limit to first 10 synonyms
      molecularFormula: properties.MolecularFormula,
      molecularWeight: properties.MolecularWeight,
      category: categorizeCompound(formula, synonyms)
    };
    
  } catch (error) {
    console.warn('Error fetching from PubChem:', error);
    return null;
  }
}

/**
 * Find the best common name from synonyms
 */
function findBestCommonName(synonyms: string[], formula: string): string | undefined {
  if (!synonyms || synonyms.length === 0) return undefined;
  
  // Filter out very long names, chemical formulas, and CAS numbers
  const filtered = synonyms.filter(name => {
    const cleanName = name.toLowerCase();
    return (
      name.length < 50 && // Not too long
      !name.match(/^\d+-\d+-\d+$/) && // Not a CAS number
      !name.match(/^[A-Z][a-z]?(\d+[A-Z][a-z]?)*\d*$/) && // Not a chemical formula
      !cleanName.includes('unii-') && // Not a UNII identifier
      !cleanName.includes('einecs') && // Not an EINECS number
      !cleanName.includes('chebi') && // Not a ChEBI identifier
      !cleanName.match(/^\d+$/) // Not just numbers
    );
  });
  
  if (filtered.length === 0) return synonyms[0];
  
  // Prefer shorter, more common names
  const sorted = filtered.sort((a, b) => {
    // Prefer names without numbers or special characters
    const aScore = (a.match(/[0-9\-\(\)\[\]]/g) || []).length;
    const bScore = (b.match(/[0-9\-\(\)\[\]]/g) || []).length;
    
    if (aScore !== bScore) return aScore - bScore;
    
    // Prefer shorter names
    return a.length - b.length;
  });
  
  return sorted[0];
}

/**
 * Categorize compound based on formula and names
 */
function categorizeCompound(formula: string, synonyms: string[]): string {
  const lowerSynonyms = synonyms.map(s => s.toLowerCase());
  
  // Check for acids
  if (formula.startsWith('H') && (
    lowerSynonyms.some(s => s.includes('acid')) ||
    formula.includes('SO4') || formula.includes('NO3') || formula.includes('PO4')
  )) {
    return 'Acid';
  }
  
  // Check for salts
  if (lowerSynonyms.some(s => s.includes('chloride') || s.includes('sulfate') || s.includes('nitrate'))) {
    return 'Salt';
  }
  
  // Check for oxides
  if (formula.includes('O') && lowerSynonyms.some(s => s.includes('oxide'))) {
    return 'Oxide';
  }
  
  // Check for organic compounds
  if (formula.includes('C') && formula.includes('H')) {
    if (lowerSynonyms.some(s => s.includes('alcohol'))) return 'Alcohol';
    if (lowerSynonyms.some(s => s.includes('acid'))) return 'Organic Acid';
    if (lowerSynonyms.some(s => s.includes('sugar') || s.includes('glucose') || s.includes('fructose'))) return 'Sugar';
    return 'Organic Compound';
  }
  
  return 'Inorganic Compound';
}

/**
 * Main function to get compound information
 */
export async function getCompoundInfo(formula: string): Promise<ExternalCompoundInfo | null> {
  const normalizedFormula = normalizeFormula(formula);
  
  // Check cache first
  if (compoundCache.has(normalizedFormula)) {
    return compoundCache.get(normalizedFormula) || null;
  }
  
  // Fetch from external API
  const info = await fetchFromPubChem(normalizedFormula);
  
  // Cache the result (including null results to avoid repeated failed requests)
  compoundCache.set(normalizedFormula, info);
  
  return info;
}

/**
 * Clear the cache (useful for testing or memory management)
 */
export function clearCompoundCache(): void {
  compoundCache.clear();
}