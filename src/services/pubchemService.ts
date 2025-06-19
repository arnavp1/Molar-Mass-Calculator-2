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
      console.log(`Fetching compound info for formula: ${formula}`);
      
      // Step 1: Get CID from molecular formula
      const cid = await this.getCIDFromFormula(formula);
      console.log(`CID found: ${cid}`);
      
      if (!cid) {
        console.log('No CID found for formula');
        this.cache.set(formula, {});
        return null;
      }

      // Step 2: Get compound information
      const [synonyms, iupacName] = await Promise.all([
        this.getSynonyms(cid),
        this.getIUPACName(cid)
      ]);

      console.log('Synonyms:', synonyms);
      console.log('IUPAC Name:', iupacName);

      const compoundInfo: PubChemCompoundInfo = {
        cid,
        iupacName,
        synonyms,
        commonName: this.extractCommonName(synonyms)
      };

      console.log('Final compound info:', compoundInfo);

      // Cache the result
      this.cache.set(formula, compoundInfo);
      return compoundInfo;

    } catch (error) {
      console.error('Error fetching compound info from PubChem:', error);
      this.cache.set(formula, {});
      throw error; // Re-throw to trigger error state in UI
    }
  }

  private async getCIDFromFormula(formula: string): Promise<number | null> {
    try {
      // Try multiple CORS proxies and direct approach
      const proxies = [
        'https://api.allorigins.win/raw?url=',
        'https://cors-anywhere.herokuapp.com/',
        '' // Direct request (might work in some environments)
      ];

      const targetUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/${encodeURIComponent(formula)}/cids/JSON`;
      
      for (const proxy of proxies) {
        try {
          const url = proxy ? proxy + encodeURIComponent(targetUrl) : targetUrl;
          console.log(`Trying URL: ${url}`);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          });
          
          console.log(`Response status: ${response.status}`);
          
          if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            continue; // Try next proxy
          }

          const text = await response.text();
          console.log('Raw response:', text);
          
          const data = JSON.parse(text);
          console.log('Parsed data:', data);
          
          // Return the first CID if available
          if (data.IdentifierList?.CID && data.IdentifierList.CID.length > 0) {
            return data.IdentifierList.CID[0];
          }
          
          // If we get here, no CID was found but request was successful
          return null;
          
        } catch (proxyError) {
          console.error(`Error with proxy ${proxy}:`, proxyError);
          continue; // Try next proxy
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error getting CID from formula:', error);
      return null;
    }
  }

  private async getSynonyms(cid: number): Promise<string[]> {
    try {
      const proxies = [
        'https://api.allorigins.win/raw?url=',
        'https://cors-anywhere.herokuapp.com/',
        ''
      ];

      const targetUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/synonyms/JSON`;
      
      for (const proxy of proxies) {
        try {
          const url = proxy ? proxy + encodeURIComponent(targetUrl) : targetUrl;
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          });
          
          if (!response.ok) {
            continue;
          }

          const text = await response.text();
          const data = JSON.parse(text);
          
          if (data.InformationList?.Information && data.InformationList.Information.length > 0) {
            return data.InformationList.Information[0].Synonym || [];
          }
          
          return [];
          
        } catch (proxyError) {
          console.error(`Error getting synonyms with proxy ${proxy}:`, proxyError);
          continue;
        }
      }
      
      return [];
    } catch (error) {
      console.error('Error getting synonyms:', error);
      return [];
    }
  }

  private async getIUPACName(cid: number): Promise<string | undefined> {
    try {
      const proxies = [
        'https://api.allorigins.win/raw?url=',
        'https://cors-anywhere.herokuapp.com/',
        ''
      ];

      const targetUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/IUPACName/JSON`;
      
      for (const proxy of proxies) {
        try {
          const url = proxy ? proxy + encodeURIComponent(targetUrl) : targetUrl;
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          });
          
          if (!response.ok) {
            continue;
          }

          const text = await response.text();
          const data = JSON.parse(text);
          
          if (data.PropertyTable?.Properties && data.PropertyTable.Properties.length > 0) {
            return data.PropertyTable.Properties[0].IUPACName;
          }
          
          return undefined;
          
        } catch (proxyError) {
          console.error(`Error getting IUPAC name with proxy ${proxy}:`, proxyError);
          continue;
        }
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
      /^ibuprofen$/i
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