export interface PubChemCompoundInfo {
  commonName?: string;
  iupacName?: string;
  synonyms?: string[];
  cid?: number;
}

class PubChemService {
  private cache = new Map<string, PubChemCompoundInfo>();

  async getCompoundInfo(formula: string): Promise<PubChemCompoundInfo | null> {
    // Check cache first
    if (this.cache.has(formula)) {
      return this.cache.get(formula) || null;
    }

    try {
      // Step 1: Get CID from molecular formula
      const cid = await this.getCIDFromFormula(formula);
      if (!cid) {
        this.cache.set(formula, {});
        return null;
      }

      // Step 2: Get compound information
      const [synonyms, iupacName] = await Promise.all([
        this.getSynonyms(cid),
        this.getIUPACName(cid)
      ]);

      const compoundInfo: PubChemCompoundInfo = {
        cid,
        iupacName,
        synonyms,
        commonName: this.extractCommonName(synonyms)
      };

      // Cache the result
      this.cache.set(formula, compoundInfo);
      return compoundInfo;

    } catch (error) {
      console.error('Error fetching compound info from PubChem:', error);
      this.cache.set(formula, {});
      return null;
    }
  }

  private async getCIDFromFormula(formula: string): Promise<number | null> {
    try {
      // Use a CORS proxy to access PubChem API
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/${encodeURIComponent(formula)}/cids/JSON`;
      
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Return the first CID if available
      if (data.IdentifierList?.CID && data.IdentifierList.CID.length > 0) {
        return data.IdentifierList.CID[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error getting CID from formula:', error);
      return null;
    }
  }

  private async getSynonyms(cid: number): Promise<string[]> {
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`;
      
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.InformationList?.Information && data.InformationList.Information.length > 0) {
        return data.InformationList.Information[0].Synonym || [];
      }
      
      return [];
    } catch (error) {
      console.error('Error getting synonyms:', error);
      return [];
    }
  }

  private async getIUPACName(cid: number): Promise<string | undefined> {
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/IUPACName/JSON`;
      
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.PropertyTable?.Properties && data.PropertyTable.Properties.length > 0) {
        return data.PropertyTable.Properties[0].IUPACName;
      }
      
      return undefined;
    } catch (error) {
      console.error('Error getting IUPAC name:', error);
      return undefined;
    }
  }

  private extractCommonName(synonyms: string[]): string | undefined {
    if (!synonyms || synonyms.length === 0) {
      return undefined;
    }

    // Priority list for common names (prefer shorter, more common names)
    const commonNamePatterns = [
      /^water$/i,
      /^methane$/i,
      /^ethane$/i,
      /^propane$/i,
      /^butane$/i,
      /^ammonia$/i,
      /^glucose$/i,
      /^ethanol$/i,
      /^methanol$/i,
      /^benzene$/i,
      /^acetone$/i,
      /^formaldehyde$/i,
      /^acetic acid$/i,
      /^sulfuric acid$/i,
      /^hydrochloric acid$/i,
      /^nitric acid$/i,
      /^sodium chloride$/i,
      /^table salt$/i,
      /^salt$/i,
      /^baking soda$/i,
      /^limestone$/i,
      /^quicklime$/i,
      /^slaked lime$/i,
      /^rust$/i,
      /^carbon dioxide$/i,
      /^carbon monoxide$/i,
      /^hydrogen peroxide$/i,
      /^ozone$/i,
      /^caffeine$/i,
      /^aspirin$/i,
      /^ibuprofen$/i,
      /^penicillin$/i,
      /^insulin$/i,
      /^morphine$/i,
      /^nicotine$/i,
      /^cocaine$/i,
      /^heroin$/i,
      /^lsd$/i,
      /^thc$/i,
      /^dna$/i,
      /^rna$/i,
      /^atp$/i,
      /^adp$/i,
      /^nadh$/i,
      /^fad$/i
    ];

    // First, try to find exact matches with common name patterns
    for (const pattern of commonNamePatterns) {
      const match = synonyms.find(synonym => pattern.test(synonym));
      if (match) {
        return match;
      }
    }

    // Filter out very technical names and CAS numbers
    const filteredSynonyms = synonyms.filter(synonym => {
      // Skip CAS numbers (format: ####-##-#)
      if (/^\d+-\d+-\d+$/.test(synonym)) return false;
      
      // Skip very long technical names (over 50 characters)
      if (synonym.length > 50) return false;
      
      // Skip names with lots of numbers and special characters
      if ((synonym.match(/\d/g) || []).length > 3) return false;
      
      // Skip names with multiple parentheses or brackets
      if ((synonym.match(/[()[\]]/g) || []).length > 2) return false;
      
      // Skip names that are mostly uppercase (likely abbreviations)
      if (synonym === synonym.toUpperCase() && synonym.length > 3) return false;
      
      return true;
    });

    // Return the shortest remaining name, or the first synonym if none pass filters
    if (filteredSynonyms.length > 0) {
      return filteredSynonyms.reduce((shortest, current) => 
        current.length < shortest.length ? current : shortest
      );
    }

    // Fallback to first synonym
    return synonyms[0];
  }

  // Clear cache (useful for testing or memory management)
  clearCache(): void {
    this.cache.clear();
  }
}

export const pubchemService = new PubChemService();