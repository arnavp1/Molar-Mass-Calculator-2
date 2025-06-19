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
 * Enhanced local database with more compounds
 */
const enhancedLocalDatabase: Record<string, ExternalCompoundInfo> = {
  // Aluminum compounds
  'AL2(SO4)3': {
    commonName: 'Aluminum Sulfate',
    iupacName: 'Dialuminum Trisulfate',
    synonyms: ['Aluminum Sulfate', 'Alum', 'Cake Alum', 'Dialuminum Trisulfate'],
    category: 'Sulfate'
  },
  'AL2SO43': {
    commonName: 'Aluminum Sulfate',
    iupacName: 'Dialuminum Trisulfate',
    synonyms: ['Aluminum Sulfate', 'Alum', 'Cake Alum'],
    category: 'Sulfate'
  },
  'ALCL3': {
    commonName: 'Aluminum Chloride',
    iupacName: 'Aluminum Trichloride',
    synonyms: ['Aluminum Chloride', 'Aluminum Trichloride'],
    category: 'Salt'
  },
  'AL(OH)3': {
    commonName: 'Aluminum Hydroxide',
    iupacName: 'Aluminum Trihydroxide',
    synonyms: ['Aluminum Hydroxide', 'Aluminum Trihydroxide', 'Alumina Trihydrate'],
    category: 'Hydroxide'
  },
  'AL2O3': {
    commonName: 'Aluminum Oxide',
    iupacName: 'Dialuminum Trioxide',
    synonyms: ['Aluminum Oxide', 'Alumina', 'Corundum'],
    category: 'Oxide'
  },

  // Iron compounds
  'FE2O3': {
    commonName: 'Iron(III) Oxide',
    iupacName: 'Diiron Trioxide',
    synonyms: ['Iron(III) Oxide', 'Ferric Oxide', 'Rust', 'Hematite'],
    category: 'Oxide'
  },
  'FEO': {
    commonName: 'Iron(II) Oxide',
    iupacName: 'Iron Oxide',
    synonyms: ['Iron(II) Oxide', 'Ferrous Oxide', 'Wüstite'],
    category: 'Oxide'
  },
  'FECL3': {
    commonName: 'Iron(III) Chloride',
    iupacName: 'Iron Trichloride',
    synonyms: ['Iron(III) Chloride', 'Ferric Chloride'],
    category: 'Salt'
  },
  'FECL2': {
    commonName: 'Iron(II) Chloride',
    iupacName: 'Iron Dichloride',
    synonyms: ['Iron(II) Chloride', 'Ferrous Chloride'],
    category: 'Salt'
  },
  'FESO4': {
    commonName: 'Iron(II) Sulfate',
    iupacName: 'Iron Sulfate',
    synonyms: ['Iron(II) Sulfate', 'Ferrous Sulfate', 'Green Vitriol'],
    category: 'Sulfate'
  },

  // Copper compounds
  'CUSO4': {
    commonName: 'Copper(II) Sulfate',
    iupacName: 'Copper Sulfate',
    synonyms: ['Copper(II) Sulfate', 'Copper Sulfate', 'Blue Vitriol', 'Cupric Sulfate'],
    category: 'Sulfate'
  },
  'CUO': {
    commonName: 'Copper(II) Oxide',
    iupacName: 'Copper Oxide',
    synonyms: ['Copper(II) Oxide', 'Cupric Oxide', 'Tenorite'],
    category: 'Oxide'
  },
  'CU2O': {
    commonName: 'Copper(I) Oxide',
    iupacName: 'Dicopper Oxide',
    synonyms: ['Copper(I) Oxide', 'Cuprous Oxide', 'Cuprite'],
    category: 'Oxide'
  },
  'CUCL2': {
    commonName: 'Copper(II) Chloride',
    iupacName: 'Copper Dichloride',
    synonyms: ['Copper(II) Chloride', 'Cupric Chloride'],
    category: 'Salt'
  },

  // Zinc compounds
  'ZNO': {
    commonName: 'Zinc Oxide',
    iupacName: 'Zinc Oxide',
    synonyms: ['Zinc Oxide', 'Zinc White', 'Philosopher\'s Wool'],
    category: 'Oxide'
  },
  'ZNCL2': {
    commonName: 'Zinc Chloride',
    iupacName: 'Zinc Dichloride',
    synonyms: ['Zinc Chloride', 'Butter of Zinc'],
    category: 'Salt'
  },
  'ZNSO4': {
    commonName: 'Zinc Sulfate',
    iupacName: 'Zinc Sulfate',
    synonyms: ['Zinc Sulfate', 'White Vitriol', 'Goslarite'],
    category: 'Sulfate'
  },

  // Magnesium compounds
  'MGO': {
    commonName: 'Magnesium Oxide',
    iupacName: 'Magnesium Oxide',
    synonyms: ['Magnesium Oxide', 'Magnesia', 'Periclase'],
    category: 'Oxide'
  },
  'MG(OH)2': {
    commonName: 'Magnesium Hydroxide',
    iupacName: 'Magnesium Dihydroxide',
    synonyms: ['Magnesium Hydroxide', 'Milk of Magnesia', 'Brucite'],
    category: 'Hydroxide'
  },
  'MGCL2': {
    commonName: 'Magnesium Chloride',
    iupacName: 'Magnesium Dichloride',
    synonyms: ['Magnesium Chloride', 'Bischofite'],
    category: 'Salt'
  },
  'MGSO4': {
    commonName: 'Magnesium Sulfate',
    iupacName: 'Magnesium Sulfate',
    synonyms: ['Magnesium Sulfate', 'Epsom Salt', 'Epsomite'],
    category: 'Sulfate'
  },

  // Calcium compounds
  'CAO': {
    commonName: 'Calcium Oxide',
    iupacName: 'Calcium Oxide',
    synonyms: ['Calcium Oxide', 'Quicklime', 'Burnt Lime', 'Lime'],
    category: 'Oxide'
  },
  'CA(OH)2': {
    commonName: 'Calcium Hydroxide',
    iupacName: 'Calcium Dihydroxide',
    synonyms: ['Calcium Hydroxide', 'Slaked Lime', 'Hydrated Lime', 'Portlandite'],
    category: 'Hydroxide'
  },
  'CACO3': {
    commonName: 'Calcium Carbonate',
    iupacName: 'Calcium Carbonate',
    synonyms: ['Calcium Carbonate', 'Limestone', 'Chalk', 'Marble', 'Calcite'],
    category: 'Carbonate'
  },
  'CASO4': {
    commonName: 'Calcium Sulfate',
    iupacName: 'Calcium Sulfate',
    synonyms: ['Calcium Sulfate', 'Gypsum', 'Plaster of Paris', 'Anhydrite'],
    category: 'Sulfate'
  },
  'CACL2': {
    commonName: 'Calcium Chloride',
    iupacName: 'Calcium Dichloride',
    synonyms: ['Calcium Chloride', 'Road Salt'],
    category: 'Salt'
  },

  // Sodium compounds
  'NAOH': {
    commonName: 'Sodium Hydroxide',
    iupacName: 'Sodium Hydroxide',
    synonyms: ['Sodium Hydroxide', 'Lye', 'Caustic Soda'],
    category: 'Hydroxide'
  },
  'NACL': {
    commonName: 'Sodium Chloride',
    iupacName: 'Sodium Chloride',
    synonyms: ['Sodium Chloride', 'Table Salt', 'Rock Salt', 'Halite'],
    category: 'Salt'
  },
  'NA2CO3': {
    commonName: 'Sodium Carbonate',
    iupacName: 'Disodium Carbonate',
    synonyms: ['Sodium Carbonate', 'Soda Ash', 'Washing Soda'],
    category: 'Carbonate'
  },
  'NAHCO3': {
    commonName: 'Sodium Bicarbonate',
    iupacName: 'Sodium Hydrogen Carbonate',
    synonyms: ['Sodium Bicarbonate', 'Baking Soda', 'Sodium Hydrogen Carbonate'],
    category: 'Bicarbonate'
  },
  'NA2SO4': {
    commonName: 'Sodium Sulfate',
    iupacName: 'Disodium Sulfate',
    synonyms: ['Sodium Sulfate', 'Glauber\'s Salt', 'Thenardite'],
    category: 'Sulfate'
  },

  // Potassium compounds
  'KOH': {
    commonName: 'Potassium Hydroxide',
    iupacName: 'Potassium Hydroxide',
    synonyms: ['Potassium Hydroxide', 'Caustic Potash', 'Potash Lye'],
    category: 'Hydroxide'
  },
  'KCL': {
    commonName: 'Potassium Chloride',
    iupacName: 'Potassium Chloride',
    synonyms: ['Potassium Chloride', 'Muriate of Potash', 'Sylvite'],
    category: 'Salt'
  },
  'K2CO3': {
    commonName: 'Potassium Carbonate',
    iupacName: 'Dipotassium Carbonate',
    synonyms: ['Potassium Carbonate', 'Potash', 'Pearl Ash'],
    category: 'Carbonate'
  },
  'KNO3': {
    commonName: 'Potassium Nitrate',
    iupacName: 'Potassium Nitrate',
    synonyms: ['Potassium Nitrate', 'Saltpeter', 'Niter'],
    category: 'Nitrate'
  },

  // Titanium compounds
  'TIO2': {
    commonName: 'Titanium Dioxide',
    iupacName: 'Titanium Dioxide',
    synonyms: ['Titanium Dioxide', 'Titania', 'Titanium White', 'Rutile', 'Anatase'],
    category: 'Oxide'
  },

  // Silicon compounds
  'SIO2': {
    commonName: 'Silicon Dioxide',
    iupacName: 'Silicon Dioxide',
    synonyms: ['Silicon Dioxide', 'Silica', 'Quartz', 'Sand'],
    category: 'Oxide'
  },

  // Lead compounds
  'PBO': {
    commonName: 'Lead(II) Oxide',
    iupacName: 'Lead Oxide',
    synonyms: ['Lead(II) Oxide', 'Lead Monoxide', 'Litharge'],
    category: 'Oxide'
  },
  'PBO2': {
    commonName: 'Lead(IV) Oxide',
    iupacName: 'Lead Dioxide',
    synonyms: ['Lead(IV) Oxide', 'Lead Dioxide', 'Plattnerite'],
    category: 'Oxide'
  },

  // Tin compounds
  'SNO': {
    commonName: 'Tin(II) Oxide',
    iupacName: 'Tin Oxide',
    synonyms: ['Tin(II) Oxide', 'Stannous Oxide'],
    category: 'Oxide'
  },
  'SNO2': {
    commonName: 'Tin(IV) Oxide',
    iupacName: 'Tin Dioxide',
    synonyms: ['Tin(IV) Oxide', 'Tin Dioxide', 'Stannic Oxide', 'Cassiterite'],
    category: 'Oxide'
  },

  // Barium compounds
  'BACL2': {
    commonName: 'Barium Chloride',
    iupacName: 'Barium Dichloride',
    synonyms: ['Barium Chloride'],
    category: 'Salt'
  },
  'BASO4': {
    commonName: 'Barium Sulfate',
    iupacName: 'Barium Sulfate',
    synonyms: ['Barium Sulfate', 'Barite', 'Barytes'],
    category: 'Sulfate'
  },

  // Silver compounds
  'AGNO3': {
    commonName: 'Silver Nitrate',
    iupacName: 'Silver Nitrate',
    synonyms: ['Silver Nitrate', 'Lunar Caustic'],
    category: 'Nitrate'
  },
  'AGCL': {
    commonName: 'Silver Chloride',
    iupacName: 'Silver Chloride',
    synonyms: ['Silver Chloride', 'Horn Silver', 'Cerargyrite'],
    category: 'Salt'
  }
};

/**
 * Try to fetch from a CORS proxy service as fallback
 */
async function fetchWithProxy(formula: string): Promise<ExternalCompoundInfo | null> {
  try {
    // Use a public CORS proxy service
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/formula/${encodeURIComponent(formula)}/property/MolecularFormula,MolecularWeight,IUPACName/JSON`;
    
    const response = await fetch(proxyUrl + encodeURIComponent(pubchemUrl));
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    const properties = data?.PropertyTable?.Properties?.[0];
    
    if (!properties) {
      return null;
    }
    
    return {
      iupacName: properties.IUPACName,
      molecularFormula: properties.MolecularFormula,
      molecularWeight: properties.MolecularWeight,
      category: 'Chemical Compound'
    };
    
  } catch (error) {
    console.warn('Proxy fetch failed:', error);
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
  
  // Check enhanced local database first
  if (enhancedLocalDatabase[normalizedFormula]) {
    const info = enhancedLocalDatabase[normalizedFormula];
    compoundCache.set(normalizedFormula, info);
    return info;
  }
  
  // Try to fetch from external API with proxy (fallback)
  try {
    const info = await fetchWithProxy(normalizedFormula);
    compoundCache.set(normalizedFormula, info);
    return info;
  } catch (error) {
    console.warn('All compound lookup methods failed:', error);
    compoundCache.set(normalizedFormula, null);
    return null;
  }
}

/**
 * Clear the cache (useful for testing or memory management)
 */
export function clearCompoundCache(): void {
  compoundCache.clear();
}