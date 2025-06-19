// Enhanced database of compounds with their common names and IUPAC names
export interface CompoundInfo {
  formula: string;
  commonName: string;
  iupacName: string;
  category?: string;
}

export const compoundDatabase: Record<string, CompoundInfo> = {
  // Simple compounds
  'H2O': {
    formula: 'H2O',
    commonName: 'Water',
    iupacName: 'Oxidane',
    category: 'Hydride'
  },
  'H2O2': {
    formula: 'H2O2',
    commonName: 'Hydrogen Peroxide',
    iupacName: 'Dihydrogen Dioxide',
    category: 'Peroxide'
  },
  'NH3': {
    formula: 'NH3',
    commonName: 'Ammonia',
    iupacName: 'Azane',
    category: 'Hydride'
  },
  'CH4': {
    formula: 'CH4',
    commonName: 'Methane',
    iupacName: 'Methane',
    category: 'Hydrocarbon'
  },
  'CO2': {
    formula: 'CO2',
    commonName: 'Carbon Dioxide',
    iupacName: 'Carbon Dioxide',
    category: 'Oxide'
  },
  'CO': {
    formula: 'CO',
    commonName: 'Carbon Monoxide',
    iupacName: 'Carbon Monoxide',
    category: 'Oxide'
  },
  'SO2': {
    formula: 'SO2',
    commonName: 'Sulfur Dioxide',
    iupacName: 'Sulfur Dioxide',
    category: 'Oxide'
  },
  'SO3': {
    formula: 'SO3',
    commonName: 'Sulfur Trioxide',
    iupacName: 'Sulfur Trioxide',
    category: 'Oxide'
  },
  'NO': {
    formula: 'NO',
    commonName: 'Nitric Oxide',
    iupacName: 'Nitrogen Monoxide',
    category: 'Oxide'
  },
  'NO2': {
    formula: 'NO2',
    commonName: 'Nitrogen Dioxide',
    iupacName: 'Nitrogen Dioxide',
    category: 'Oxide'
  },
  'N2O': {
    formula: 'N2O',
    commonName: 'Nitrous Oxide',
    iupacName: 'Dinitrogen Monoxide',
    category: 'Oxide'
  },
  'N2O4': {
    formula: 'N2O4',
    commonName: 'Dinitrogen Tetroxide',
    iupacName: 'Dinitrogen Tetroxide',
    category: 'Oxide'
  },
  'N2O5': {
    formula: 'N2O5',
    commonName: 'Dinitrogen Pentoxide',
    iupacName: 'Dinitrogen Pentoxide',
    category: 'Oxide'
  },
  'O3': {
    formula: 'O3',
    commonName: 'Ozone',
    iupacName: 'Trioxygen',
    category: 'Allotrope'
  },

  // Acids
  'HCl': {
    formula: 'HCl',
    commonName: 'Hydrochloric Acid',
    iupacName: 'Hydrogen Chloride',
    category: 'Acid'
  },
  'HBr': {
    formula: 'HBr',
    commonName: 'Hydrobromic Acid',
    iupacName: 'Hydrogen Bromide',
    category: 'Acid'
  },
  'HI': {
    formula: 'HI',
    commonName: 'Hydroiodic Acid',
    iupacName: 'Hydrogen Iodide',
    category: 'Acid'
  },
  'HF': {
    formula: 'HF',
    commonName: 'Hydrofluoric Acid',
    iupacName: 'Hydrogen Fluoride',
    category: 'Acid'
  },
  'H2SO4': {
    formula: 'H2SO4',
    commonName: 'Sulfuric Acid',
    iupacName: 'Dihydrogen Sulfate',
    category: 'Acid'
  },
  'H2SO3': {
    formula: 'H2SO3',
    commonName: 'Sulfurous Acid',
    iupacName: 'Dihydrogen Sulfite',
    category: 'Acid'
  },
  'HNO3': {
    formula: 'HNO3',
    commonName: 'Nitric Acid',
    iupacName: 'Hydrogen Nitrate',
    category: 'Acid'
  },
  'HNO2': {
    formula: 'HNO2',
    commonName: 'Nitrous Acid',
    iupacName: 'Hydrogen Nitrite',
    category: 'Acid'
  },
  'H3PO4': {
    formula: 'H3PO4',
    commonName: 'Phosphoric Acid',
    iupacName: 'Trihydrogen Phosphate',
    category: 'Acid'
  },
  'H3PO3': {
    formula: 'H3PO3',
    commonName: 'Phosphorous Acid',
    iupacName: 'Trihydrogen Phosphite',
    category: 'Acid'
  },
  'H2CO3': {
    formula: 'H2CO3',
    commonName: 'Carbonic Acid',
    iupacName: 'Dihydrogen Carbonate',
    category: 'Acid'
  },
  'CH3COOH': {
    formula: 'CH3COOH',
    commonName: 'Acetic Acid',
    iupacName: 'Ethanoic Acid',
    category: 'Organic Acid'
  },
  'HCOOH': {
    formula: 'HCOOH',
    commonName: 'Formic Acid',
    iupacName: 'Methanoic Acid',
    category: 'Organic Acid'
  },

  // Organic compounds
  'C2H6': {
    formula: 'C2H6',
    commonName: 'Ethane',
    iupacName: 'Ethane',
    category: 'Hydrocarbon'
  },
  'C3H8': {
    formula: 'C3H8',
    commonName: 'Propane',
    iupacName: 'Propane',
    category: 'Hydrocarbon'
  },
  'C4H10': {
    formula: 'C4H10',
    commonName: 'Butane',
    iupacName: 'Butane',
    category: 'Hydrocarbon'
  },
  'C5H12': {
    formula: 'C5H12',
    commonName: 'Pentane',
    iupacName: 'Pentane',
    category: 'Hydrocarbon'
  },
  'C6H14': {
    formula: 'C6H14',
    commonName: 'Hexane',
    iupacName: 'Hexane',
    category: 'Hydrocarbon'
  },
  'C2H4': {
    formula: 'C2H4',
    commonName: 'Ethylene',
    iupacName: 'Ethene',
    category: 'Alkene'
  },
  'C3H6': {
    formula: 'C3H6',
    commonName: 'Propylene',
    iupacName: 'Propene',
    category: 'Alkene'
  },
  'C2H2': {
    formula: 'C2H2',
    commonName: 'Acetylene',
    iupacName: 'Ethyne',
    category: 'Alkyne'
  },
  'C6H6': {
    formula: 'C6H6',
    commonName: 'Benzene',
    iupacName: 'Benzene',
    category: 'Aromatic'
  },
  'C7H8': {
    formula: 'C7H8',
    commonName: 'Toluene',
    iupacName: 'Methylbenzene',
    category: 'Aromatic'
  },
  'C6H12O6': {
    formula: 'C6H12O6',
    commonName: 'Glucose',
    iupacName: 'D-Glucopyranose',
    category: 'Sugar'
  },
  'C12H22O11': {
    formula: 'C12H22O11',
    commonName: 'Sucrose',
    iupacName: 'α-D-Glucopyranosyl-(1→2)-β-D-fructofuranoside',
    category: 'Sugar'
  },
  'C2H5OH': {
    formula: 'C2H5OH',
    commonName: 'Ethanol',
    iupacName: 'Ethanol',
    category: 'Alcohol'
  },
  'CH3OH': {
    formula: 'CH3OH',
    commonName: 'Methanol',
    iupacName: 'Methanol',
    category: 'Alcohol'
  },
  'C3H7OH': {
    formula: 'C3H7OH',
    commonName: 'Propanol',
    iupacName: 'Propan-1-ol',
    category: 'Alcohol'
  },

  // Salts and ionic compounds
  'NaCl': {
    formula: 'NaCl',
    commonName: 'Table Salt',
    iupacName: 'Sodium Chloride',
    category: 'Salt'
  },
  'KCl': {
    formula: 'KCl',
    commonName: 'Potassium Chloride',
    iupacName: 'Potassium Chloride',
    category: 'Salt'
  },
  'CaCl2': {
    formula: 'CaCl2',
    commonName: 'Calcium Chloride',
    iupacName: 'Calcium Dichloride',
    category: 'Salt'
  },
  'MgCl2': {
    formula: 'MgCl2',
    commonName: 'Magnesium Chloride',
    iupacName: 'Magnesium Dichloride',
    category: 'Salt'
  },
  'AlCl3': {
    formula: 'AlCl3',
    commonName: 'Aluminum Chloride',
    iupacName: 'Aluminum Trichloride',
    category: 'Salt'
  },
  'FeCl2': {
    formula: 'FeCl2',
    commonName: 'Iron(II) Chloride',
    iupacName: 'Iron Dichloride',
    category: 'Salt'
  },
  'FeCl3': {
    formula: 'FeCl3',
    commonName: 'Iron(III) Chloride',
    iupacName: 'Iron Trichloride',
    category: 'Salt'
  },
  'CuCl': {
    formula: 'CuCl',
    commonName: 'Copper(I) Chloride',
    iupacName: 'Copper Chloride',
    category: 'Salt'
  },
  'CuCl2': {
    formula: 'CuCl2',
    commonName: 'Copper(II) Chloride',
    iupacName: 'Copper Dichloride',
    category: 'Salt'
  },
  'ZnCl2': {
    formula: 'ZnCl2',
    commonName: 'Zinc Chloride',
    iupacName: 'Zinc Dichloride',
    category: 'Salt'
  },

  // Oxides
  'MgO': {
    formula: 'MgO',
    commonName: 'Magnesia',
    iupacName: 'Magnesium Oxide',
    category: 'Oxide'
  },
  'CaO': {
    formula: 'CaO',
    commonName: 'Quicklime',
    iupacName: 'Calcium Oxide',
    category: 'Oxide'
  },
  'Al2O3': {
    formula: 'Al2O3',
    commonName: 'Alumina',
    iupacName: 'Dialuminum Trioxide',
    category: 'Oxide'
  },
  'Fe2O3': {
    formula: 'Fe2O3',
    commonName: 'Rust',
    iupacName: 'Diiron Trioxide',
    category: 'Oxide'
  },
  'FeO': {
    formula: 'FeO',
    commonName: 'Iron(II) Oxide',
    iupacName: 'Iron Oxide',
    category: 'Oxide'
  },
  'CuO': {
    formula: 'CuO',
    commonName: 'Copper(II) Oxide',
    iupacName: 'Copper Oxide',
    category: 'Oxide'
  },
  'Cu2O': {
    formula: 'Cu2O',
    commonName: 'Copper(I) Oxide',
    iupacName: 'Dicopper Oxide',
    category: 'Oxide'
  },
  'ZnO': {
    formula: 'ZnO',
    commonName: 'Zinc Oxide',
    iupacName: 'Zinc Oxide',
    category: 'Oxide'
  },
  'TiO2': {
    formula: 'TiO2',
    commonName: 'Titanium Dioxide',
    iupacName: 'Titanium Dioxide',
    category: 'Oxide'
  },
  'SiO2': {
    formula: 'SiO2',
    commonName: 'Silica',
    iupacName: 'Silicon Dioxide',
    category: 'Oxide'
  },
  'P4O10': {
    formula: 'P4O10',
    commonName: 'Phosphorus Pentoxide',
    iupacName: 'Tetraphosphorus Decaoxide',
    category: 'Oxide'
  },
  'P2O5': {
    formula: 'P2O5',
    commonName: 'Phosphorus Pentoxide',
    iupacName: 'Diphosphorus Pentoxide',
    category: 'Oxide'
  },

  // Carbonates and bicarbonates
  'CaCO3': {
    formula: 'CaCO3',
    commonName: 'Limestone',
    iupacName: 'Calcium Carbonate',
    category: 'Carbonate'
  },
  'Na2CO3': {
    formula: 'Na2CO3',
    commonName: 'Soda Ash',
    iupacName: 'Disodium Carbonate',
    category: 'Carbonate'
  },
  'K2CO3': {
    formula: 'K2CO3',
    commonName: 'Potash',
    iupacName: 'Dipotassium Carbonate',
    category: 'Carbonate'
  },
  'MgCO3': {
    formula: 'MgCO3',
    commonName: 'Magnesium Carbonate',
    iupacName: 'Magnesium Carbonate',
    category: 'Carbonate'
  },
  'NaHCO3': {
    formula: 'NaHCO3',
    commonName: 'Baking Soda',
    iupacName: 'Sodium Hydrogen Carbonate',
    category: 'Bicarbonate'
  },
  'KHCO3': {
    formula: 'KHCO3',
    commonName: 'Potassium Bicarbonate',
    iupacName: 'Potassium Hydrogen Carbonate',
    category: 'Bicarbonate'
  },

  // Hydroxides
  'Ca(OH)2': {
    formula: 'Ca(OH)2',
    commonName: 'Slaked Lime',
    iupacName: 'Calcium Dihydroxide',
    category: 'Hydroxide'
  },
  'NaOH': {
    formula: 'NaOH',
    commonName: 'Lye',
    iupacName: 'Sodium Hydroxide',
    category: 'Hydroxide'
  },
  'KOH': {
    formula: 'KOH',
    commonName: 'Potassium Hydroxide',
    iupacName: 'Potassium Hydroxide',
    category: 'Hydroxide'
  },
  'Mg(OH)2': {
    formula: 'Mg(OH)2',
    commonName: 'Milk of Magnesia',
    iupacName: 'Magnesium Dihydroxide',
    category: 'Hydroxide'
  },
  'Al(OH)3': {
    formula: 'Al(OH)3',
    commonName: 'Aluminum Hydroxide',
    iupacName: 'Aluminum Trihydroxide',
    category: 'Hydroxide'
  },
  'Fe(OH)2': {
    formula: 'Fe(OH)2',
    commonName: 'Iron(II) Hydroxide',
    iupacName: 'Iron Dihydroxide',
    category: 'Hydroxide'
  },
  'Fe(OH)3': {
    formula: 'Fe(OH)3',
    commonName: 'Iron(III) Hydroxide',
    iupacName: 'Iron Trihydroxide',
    category: 'Hydroxide'
  },

  // Sulfates
  'CaSO4': {
    formula: 'CaSO4',
    commonName: 'Gypsum',
    iupacName: 'Calcium Sulfate',
    category: 'Sulfate'
  },
  'Na2SO4': {
    formula: 'Na2SO4',
    commonName: 'Sodium Sulfate',
    iupacName: 'Disodium Sulfate',
    category: 'Sulfate'
  },
  'K2SO4': {
    formula: 'K2SO4',
    commonName: 'Potassium Sulfate',
    iupacName: 'Dipotassium Sulfate',
    category: 'Sulfate'
  },
  'MgSO4': {
    formula: 'MgSO4',
    commonName: 'Epsom Salt',
    iupacName: 'Magnesium Sulfate',
    category: 'Sulfate'
  },
  'CuSO4': {
    formula: 'CuSO4',
    commonName: 'Copper Sulfate',
    iupacName: 'Copper(II) Sulfate',
    category: 'Sulfate'
  },
  'FeSO4': {
    formula: 'FeSO4',
    commonName: 'Iron(II) Sulfate',
    iupacName: 'Iron Sulfate',
    category: 'Sulfate'
  },
  'ZnSO4': {
    formula: 'ZnSO4',
    commonName: 'Zinc Sulfate',
    iupacName: 'Zinc Sulfate',
    category: 'Sulfate'
  },
  'Al2(SO4)3': {
    formula: 'Al2(SO4)3',
    commonName: 'Aluminum Sulfate',
    iupacName: 'Dialuminum Trisulfate',
    category: 'Sulfate'
  },

  // Nitrates
  'NaNO3': {
    formula: 'NaNO3',
    commonName: 'Sodium Nitrate',
    iupacName: 'Sodium Nitrate',
    category: 'Nitrate'
  },
  'KNO3': {
    formula: 'KNO3',
    commonName: 'Saltpeter',
    iupacName: 'Potassium Nitrate',
    category: 'Nitrate'
  },
  'Ca(NO3)2': {
    formula: 'Ca(NO3)2',
    commonName: 'Calcium Nitrate',
    iupacName: 'Calcium Dinitrate',
    category: 'Nitrate'
  },
  'Mg(NO3)2': {
    formula: 'Mg(NO3)2',
    commonName: 'Magnesium Nitrate',
    iupacName: 'Magnesium Dinitrate',
    category: 'Nitrate'
  },
  'AgNO3': {
    formula: 'AgNO3',
    commonName: 'Silver Nitrate',
    iupacName: 'Silver Nitrate',
    category: 'Nitrate'
  },
  'Cu(NO3)2': {
    formula: 'Cu(NO3)2',
    commonName: 'Copper(II) Nitrate',
    iupacName: 'Copper Dinitrate',
    category: 'Nitrate'
  },

  // Phosphates
  'Na3PO4': {
    formula: 'Na3PO4',
    commonName: 'Sodium Phosphate',
    iupacName: 'Trisodium Phosphate',
    category: 'Phosphate'
  },
  'K3PO4': {
    formula: 'K3PO4',
    commonName: 'Potassium Phosphate',
    iupacName: 'Tripotassium Phosphate',
    category: 'Phosphate'
  },
  'Ca3(PO4)2': {
    formula: 'Ca3(PO4)2',
    commonName: 'Calcium Phosphate',
    iupacName: 'Tricalcium Diphosphate',
    category: 'Phosphate'
  },

  // Other important compounds
  'BaCl2': {
    formula: 'BaCl2',
    commonName: 'Barium Chloride',
    iupacName: 'Barium Dichloride',
    category: 'Salt'
  },
  'BaSO4': {
    formula: 'BaSO4',
    commonName: 'Barium Sulfate',
    iupacName: 'Barium Sulfate',
    category: 'Sulfate'
  },
  'PbO': {
    formula: 'PbO',
    commonName: 'Lead(II) Oxide',
    iupacName: 'Lead Oxide',
    category: 'Oxide'
  },
  'PbO2': {
    formula: 'PbO2',
    commonName: 'Lead(IV) Oxide',
    iupacName: 'Lead Dioxide',
    category: 'Oxide'
  },
  'SnO': {
    formula: 'SnO',
    commonName: 'Tin(II) Oxide',
    iupacName: 'Tin Oxide',
    category: 'Oxide'
  },
  'SnO2': {
    formula: 'SnO2',
    commonName: 'Tin(IV) Oxide',
    iupacName: 'Tin Dioxide',
    category: 'Oxide'
  }
};

// Function to normalize formula for lookup (remove spaces, standardize format)
export function normalizeFormula(formula: string): string {
  return formula.replace(/\s/g, '');
}

// Function to get compound information
export function getCompoundInfo(formula: string): CompoundInfo | null {
  const normalized = normalizeFormula(formula);
  return compoundDatabase[normalized] || null;
}

// Enhanced systematic naming function
export function generateSystematicName(formula: string, elements: Array<{element: string, count: number}>): string | null {
  if (elements.length === 0) return null;

  // Handle single element compounds
  if (elements.length === 1) {
    const element = elements[0];
    if (element.count === 1) {
      return getElementName(element.element);
    } else {
      const prefix = getPrefix(element.count);
      return `${prefix}${getElementName(element.element).toLowerCase()}`;
    }
  }

  // Handle binary compounds (two elements)
  if (elements.length === 2) {
    return generateBinaryCompoundName(elements);
  }

  // Handle ternary and more complex compounds
  if (elements.length >= 3) {
    return generateComplexCompoundName(elements);
  }

  return null;
}

function generateBinaryCompoundName(elements: Array<{element: string, count: number}>): string {
  const prefixes = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca'];
  
  // Sort elements by electronegativity (less electronegative first)
  const electronegativityOrder = [
    'Fr', 'Cs', 'Rb', 'K', 'Na', 'Li', 'Ra', 'Ba', 'Sr', 'Ca', 'Mg', 'Be',
    'Ac', 'La', 'Y', 'Sc', 'Lu', 'Yb', 'Tm', 'Er', 'Ho', 'Dy', 'Tb', 'Gd',
    'Eu', 'Sm', 'Pm', 'Nd', 'Pr', 'Ce', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am',
    'Al', 'Ga', 'In', 'Tl', 'Sn', 'Pb', 'Bi', 'Po', 'Zn', 'Cd', 'Hg',
    'Cu', 'Ag', 'Au', 'Ni', 'Pd', 'Pt', 'Co', 'Rh', 'Ir', 'Fe', 'Ru', 'Os',
    'Mn', 'Tc', 'Re', 'Cr', 'Mo', 'W', 'V', 'Nb', 'Ta', 'Ti', 'Zr', 'Hf',
    'B', 'Si', 'Ge', 'As', 'Sb', 'Te', 'P', 'S', 'Se', 'C', 'N', 'H',
    'At', 'I', 'Br', 'Cl', 'O', 'F'
  ];

  const sortedElements = [...elements].sort((a, b) => {
    const aIndex = electronegativityOrder.indexOf(a.element);
    const bIndex = electronegativityOrder.indexOf(b.element);
    return aIndex - bIndex;
  });

  const [first, second] = sortedElements;

  // Generate name for first element
  const firstPrefix = first.count > 1 ? prefixes[first.count] || `${first.count}-` : '';
  const firstName = getElementName(first.element).toLowerCase();

  // Generate name for second element with -ide suffix
  const secondPrefix = second.count > 1 ? prefixes[second.count] || `${second.count}-` : 'mono';
  let secondName = getElementName(second.element).toLowerCase();
  
  // Apply -ide suffix rules
  secondName = applyIdeSuffix(secondName);

  // Special case: don't use "mono" prefix for first element in binary compounds
  const finalFirstPrefix = first.count === 1 ? '' : firstPrefix;
  
  return `${finalFirstPrefix}${firstName} ${secondPrefix}${secondName}`;
}

function generateComplexCompoundName(elements: Array<{element: string, count: number}>): string {
  // For complex compounds, use a simplified systematic approach
  const parts = elements.map(element => {
    const prefix = element.count > 1 ? getPrefix(element.count) : '';
    const name = getElementName(element.element).toLowerCase();
    return `${prefix}${name}`;
  });

  return parts.join(' ');
}

function applyIdeSuffix(elementName: string): string {
  // Rules for converting element names to -ide form
  const ideRules: Record<string, string> = {
    'fluorine': 'fluoride',
    'chlorine': 'chloride',
    'bromine': 'bromide',
    'iodine': 'iodide',
    'oxygen': 'oxide',
    'sulfur': 'sulfide',
    'nitrogen': 'nitride',
    'phosphorus': 'phosphide',
    'carbon': 'carbide',
    'silicon': 'silicide',
    'hydrogen': 'hydride',
    'selenium': 'selenide',
    'tellurium': 'telluride',
    'arsenic': 'arsenide',
    'antimony': 'antimonide',
    'bismuth': 'bismuthide'
  };

  return ideRules[elementName] || `${elementName}ide`;
}

function getPrefix(count: number): string {
  const prefixes = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca'];
  return prefixes[count] || `${count}-`;
}

function getElementName(symbol: string): string {
  const names: Record<string, string> = {
    'H': 'Hydrogen', 'He': 'Helium', 'Li': 'Lithium', 'Be': 'Beryllium', 'B': 'Boron',
    'C': 'Carbon', 'N': 'Nitrogen', 'O': 'Oxygen', 'F': 'Fluorine', 'Ne': 'Neon',
    'Na': 'Sodium', 'Mg': 'Magnesium', 'Al': 'Aluminum', 'Si': 'Silicon', 'P': 'Phosphorus',
    'S': 'Sulfur', 'Cl': 'Chlorine', 'Ar': 'Argon', 'K': 'Potassium', 'Ca': 'Calcium',
    'Sc': 'Scandium', 'Ti': 'Titanium', 'V': 'Vanadium', 'Cr': 'Chromium', 'Mn': 'Manganese',
    'Fe': 'Iron', 'Co': 'Cobalt', 'Ni': 'Nickel', 'Cu': 'Copper', 'Zn': 'Zinc',
    'Ga': 'Gallium', 'Ge': 'Germanium', 'As': 'Arsenic', 'Se': 'Selenium', 'Br': 'Bromine',
    'Kr': 'Krypton', 'Rb': 'Rubidium', 'Sr': 'Strontium', 'Y': 'Yttrium', 'Zr': 'Zirconium',
    'Nb': 'Niobium', 'Mo': 'Molybdenum', 'Tc': 'Technetium', 'Ru': 'Ruthenium', 'Rh': 'Rhodium',
    'Pd': 'Palladium', 'Ag': 'Silver', 'Cd': 'Cadmium', 'In': 'Indium', 'Sn': 'Tin',
    'Sb': 'Antimony', 'Te': 'Tellurium', 'I': 'Iodine', 'Xe': 'Xenon', 'Cs': 'Cesium',
    'Ba': 'Barium', 'La': 'Lanthanum', 'Ce': 'Cerium', 'Pr': 'Praseodymium', 'Nd': 'Neodymium',
    'Pm': 'Promethium', 'Sm': 'Samarium', 'Eu': 'Europium', 'Gd': 'Gadolinium', 'Tb': 'Terbium',
    'Dy': 'Dysprosium', 'Ho': 'Holmium', 'Er': 'Erbium', 'Tm': 'Thulium', 'Yb': 'Ytterbium',
    'Lu': 'Lutetium', 'Hf': 'Hafnium', 'Ta': 'Tantalum', 'W': 'Tungsten', 'Re': 'Rhenium',
    'Os': 'Osmium', 'Ir': 'Iridium', 'Pt': 'Platinum', 'Au': 'Gold', 'Hg': 'Mercury',
    'Tl': 'Thallium', 'Pb': 'Lead', 'Bi': 'Bismuth', 'Po': 'Polonium', 'At': 'Astatine',
    'Rn': 'Radon', 'Fr': 'Francium', 'Ra': 'Radium', 'Ac': 'Actinium', 'Th': 'Thorium',
    'Pa': 'Protactinium', 'U': 'Uranium', 'Np': 'Neptunium', 'Pu': 'Plutonium', 'Am': 'Americium'
  };
  return names[symbol] || symbol;
}