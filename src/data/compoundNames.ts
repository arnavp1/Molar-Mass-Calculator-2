// Database of common compounds with their common names and IUPAC names
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
  'HNO3': {
    formula: 'HNO3',
    commonName: 'Nitric Acid',
    iupacName: 'Hydrogen Nitrate',
    category: 'Acid'
  },
  'H3PO4': {
    formula: 'H3PO4',
    commonName: 'Phosphoric Acid',
    iupacName: 'Trihydrogen Phosphate',
    category: 'Acid'
  },
  'CH3COOH': {
    formula: 'CH3COOH',
    commonName: 'Acetic Acid',
    iupacName: 'Ethanoic Acid',
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
  'C2H4': {
    formula: 'C2H4',
    commonName: 'Ethylene',
    iupacName: 'Ethene',
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
  'C6H12O6': {
    formula: 'C6H12O6',
    commonName: 'Glucose',
    iupacName: 'D-Glucopyranose',
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
  'CaCO3': {
    formula: 'CaCO3',
    commonName: 'Limestone',
    iupacName: 'Calcium Carbonate',
    category: 'Carbonate'
  },
  'NaHCO3': {
    formula: 'NaHCO3',
    commonName: 'Baking Soda',
    iupacName: 'Sodium Hydrogen Carbonate',
    category: 'Bicarbonate'
  },
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

  // Other common compounds
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
  'AgNO3': {
    formula: 'AgNO3',
    commonName: 'Silver Nitrate',
    iupacName: 'Silver Nitrate',
    category: 'Salt'
  },
  'BaCl2': {
    formula: 'BaCl2',
    commonName: 'Barium Chloride',
    iupacName: 'Barium Dichloride',
    category: 'Salt'
  },
  'CuSO4': {
    formula: 'CuSO4',
    commonName: 'Copper Sulfate',
    iupacName: 'Copper(II) Sulfate',
    category: 'Salt'
  },
  'FeCl3': {
    formula: 'FeCl3',
    commonName: 'Iron(III) Chloride',
    iupacName: 'Iron Trichloride',
    category: 'Salt'
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

// Function to generate systematic name for simple binary compounds
export function generateSystematicName(formula: string, elements: Array<{element: string, count: number}>): string | null {
  if (elements.length !== 2) return null;

  const prefixes = ['', 'mono', 'di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca'];
  const [first, second] = elements.sort((a, b) => {
    // Sort by electronegativity (simplified ordering)
    const order = ['C', 'Si', 'B', 'H', 'P', 'As', 'S', 'Se', 'I', 'Br', 'Cl', 'N', 'O', 'F'];
    return order.indexOf(a.element) - order.indexOf(b.element);
  });

  const firstPrefix = first.count > 1 ? prefixes[first.count] : '';
  const secondPrefix = second.count > 1 ? prefixes[second.count] : 'mono';
  
  const firstElementName = getElementName(first.element);
  let secondElementName = getElementName(second.element);
  
  // Add -ide suffix to second element
  if (secondElementName.endsWith('ine')) {
    secondElementName = secondElementName.slice(0, -3) + 'ide';
  } else if (secondElementName.endsWith('gen')) {
    secondElementName = secondElementName.slice(0, -3) + 'ide';
  } else if (secondElementName.endsWith('ur')) {
    secondElementName = secondElementName.slice(0, -2) + 'ide';
  } else if (secondElementName.endsWith('on')) {
    secondElementName = secondElementName.slice(0, -2) + 'ide';
  } else {
    secondElementName = secondElementName + 'ide';
  }

  return `${firstPrefix}${firstElementName.toLowerCase()} ${secondPrefix}${secondElementName.toLowerCase()}`;
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
    'Ba': 'Barium', 'La': 'Lanthanum', 'Hf': 'Hafnium', 'Ta': 'Tantalum', 'W': 'Tungsten',
    'Re': 'Rhenium', 'Os': 'Osmium', 'Ir': 'Iridium', 'Pt': 'Platinum', 'Au': 'Gold',
    'Hg': 'Mercury', 'Tl': 'Thallium', 'Pb': 'Lead', 'Bi': 'Bismuth', 'Po': 'Polonium',
    'At': 'Astatine', 'Rn': 'Radon'
  };
  return names[symbol] || symbol;
}