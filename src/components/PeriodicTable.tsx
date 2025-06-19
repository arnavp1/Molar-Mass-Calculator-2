import React, { useState } from 'react';
import { X, Search, Info } from 'lucide-react';
import { atomicMasses, elementNames } from '../data/atomicMasses';
import { getElementDetails } from '../data/elementDetails';
import { ElementDetailsModal } from './ElementDetailsModal';

interface PeriodicTableProps {
  isOpen: boolean;
  onClose: () => void;
  onElementSelect: (element: string) => void;
}

interface ElementData {
  symbol: string;
  name: string;
  atomicMass: number;
  group: number;
  period: number;
  atomicNumber: number;
}

// Complete periodic table data with all 118 elements
const periodicTableData: ElementData[] = [
  // Period 1
  { symbol: 'H', name: 'Hydrogen', atomicMass: 1.008, group: 1, period: 1, atomicNumber: 1 },
  { symbol: 'He', name: 'Helium', atomicMass: 4.003, group: 18, period: 1, atomicNumber: 2 },
  
  // Period 2
  { symbol: 'Li', name: 'Lithium', atomicMass: 6.94, group: 1, period: 2, atomicNumber: 3 },
  { symbol: 'Be', name: 'Beryllium', atomicMass: 9.012, group: 2, period: 2, atomicNumber: 4 },
  { symbol: 'B', name: 'Boron', atomicMass: 10.81, group: 13, period: 2, atomicNumber: 5 },
  { symbol: 'C', name: 'Carbon', atomicMass: 12.01, group: 14, period: 2, atomicNumber: 6 },
  { symbol: 'N', name: 'Nitrogen', atomicMass: 14.01, group: 15, period: 2, atomicNumber: 7 },
  { symbol: 'O', name: 'Oxygen', atomicMass: 16.00, group: 16, period: 2, atomicNumber: 8 },
  { symbol: 'F', name: 'Fluorine', atomicMass: 19.00, group: 17, period: 2, atomicNumber: 9 },
  { symbol: 'Ne', name: 'Neon', atomicMass: 20.18, group: 18, period: 2, atomicNumber: 10 },
  
  // Period 3
  { symbol: 'Na', name: 'Sodium', atomicMass: 22.99, group: 1, period: 3, atomicNumber: 11 },
  { symbol: 'Mg', name: 'Magnesium', atomicMass: 24.31, group: 2, period: 3, atomicNumber: 12 },
  { symbol: 'Al', name: 'Aluminum', atomicMass: 26.98, group: 13, period: 3, atomicNumber: 13 },
  { symbol: 'Si', name: 'Silicon', atomicMass: 28.09, group: 14, period: 3, atomicNumber: 14 },
  { symbol: 'P', name: 'Phosphorus', atomicMass: 30.97, group: 15, period: 3, atomicNumber: 15 },
  { symbol: 'S', name: 'Sulfur', atomicMass: 32.07, group: 16, period: 3, atomicNumber: 16 },
  { symbol: 'Cl', name: 'Chlorine', atomicMass: 35.45, group: 17, period: 3, atomicNumber: 17 },
  { symbol: 'Ar', name: 'Argon', atomicMass: 39.95, group: 18, period: 3, atomicNumber: 18 },
  
  // Period 4
  { symbol: 'K', name: 'Potassium', atomicMass: 39.10, group: 1, period: 4, atomicNumber: 19 },
  { symbol: 'Ca', name: 'Calcium', atomicMass: 40.08, group: 2, period: 4, atomicNumber: 20 },
  { symbol: 'Sc', name: 'Scandium', atomicMass: 44.96, group: 3, period: 4, atomicNumber: 21 },
  { symbol: 'Ti', name: 'Titanium', atomicMass: 47.87, group: 4, period: 4, atomicNumber: 22 },
  { symbol: 'V', name: 'Vanadium', atomicMass: 50.94, group: 5, period: 4, atomicNumber: 23 },
  { symbol: 'Cr', name: 'Chromium', atomicMass: 52.00, group: 6, period: 4, atomicNumber: 24 },
  { symbol: 'Mn', name: 'Manganese', atomicMass: 54.94, group: 7, period: 4, atomicNumber: 25 },
  { symbol: 'Fe', name: 'Iron', atomicMass: 55.85, group: 8, period: 4, atomicNumber: 26 },
  { symbol: 'Co', name: 'Cobalt', atomicMass: 58.93, group: 9, period: 4, atomicNumber: 27 },
  { symbol: 'Ni', name: 'Nickel', atomicMass: 58.69, group: 10, period: 4, atomicNumber: 28 },
  { symbol: 'Cu', name: 'Copper', atomicMass: 63.55, group: 11, period: 4, atomicNumber: 29 },
  { symbol: 'Zn', name: 'Zinc', atomicMass: 65.38, group: 12, period: 4, atomicNumber: 30 },
  { symbol: 'Ga', name: 'Gallium', atomicMass: 69.72, group: 13, period: 4, atomicNumber: 31 },
  { symbol: 'Ge', name: 'Germanium', atomicMass: 72.63, group: 14, period: 4, atomicNumber: 32 },
  { symbol: 'As', name: 'Arsenic', atomicMass: 74.92, group: 15, period: 4, atomicNumber: 33 },
  { symbol: 'Se', name: 'Selenium', atomicMass: 78.96, group: 16, period: 4, atomicNumber: 34 },
  { symbol: 'Br', name: 'Bromine', atomicMass: 79.90, group: 17, period: 4, atomicNumber: 35 },
  { symbol: 'Kr', name: 'Krypton', atomicMass: 83.80, group: 18, period: 4, atomicNumber: 36 },
  
  // Period 5
  { symbol: 'Rb', name: 'Rubidium', atomicMass: 85.47, group: 1, period: 5, atomicNumber: 37 },
  { symbol: 'Sr', name: 'Strontium', atomicMass: 87.62, group: 2, period: 5, atomicNumber: 38 },
  { symbol: 'Y', name: 'Yttrium', atomicMass: 88.91, group: 3, period: 5, atomicNumber: 39 },
  { symbol: 'Zr', name: 'Zirconium', atomicMass: 91.22, group: 4, period: 5, atomicNumber: 40 },
  { symbol: 'Nb', name: 'Niobium', atomicMass: 92.91, group: 5, period: 5, atomicNumber: 41 },
  { symbol: 'Mo', name: 'Molybdenum', atomicMass: 95.96, group: 6, period: 5, atomicNumber: 42 },
  { symbol: 'Tc', name: 'Technetium', atomicMass: 98.91, group: 7, period: 5, atomicNumber: 43 },
  { symbol: 'Ru', name: 'Ruthenium', atomicMass: 101.07, group: 8, period: 5, atomicNumber: 44 },
  { symbol: 'Rh', name: 'Rhodium', atomicMass: 102.91, group: 9, period: 5, atomicNumber: 45 },
  { symbol: 'Pd', name: 'Palladium', atomicMass: 106.42, group: 10, period: 5, atomicNumber: 46 },
  { symbol: 'Ag', name: 'Silver', atomicMass: 107.87, group: 11, period: 5, atomicNumber: 47 },
  { symbol: 'Cd', name: 'Cadmium', atomicMass: 112.41, group: 12, period: 5, atomicNumber: 48 },
  { symbol: 'In', name: 'Indium', atomicMass: 114.82, group: 13, period: 5, atomicNumber: 49 },
  { symbol: 'Sn', name: 'Tin', atomicMass: 118.71, group: 14, period: 5, atomicNumber: 50 },
  { symbol: 'Sb', name: 'Antimony', atomicMass: 121.76, group: 15, period: 5, atomicNumber: 51 },
  { symbol: 'Te', name: 'Tellurium', atomicMass: 127.60, group: 16, period: 5, atomicNumber: 52 },
  { symbol: 'I', name: 'Iodine', atomicMass: 126.90, group: 17, period: 5, atomicNumber: 53 },
  { symbol: 'Xe', name: 'Xenon', atomicMass: 131.29, group: 18, period: 5, atomicNumber: 54 },
  
  // Period 6
  { symbol: 'Cs', name: 'Cesium', atomicMass: 132.91, group: 1, period: 6, atomicNumber: 55 },
  { symbol: 'Ba', name: 'Barium', atomicMass: 137.33, group: 2, period: 6, atomicNumber: 56 },
  // Lanthanides (shown separately)
  { symbol: 'La', name: 'Lanthanum', atomicMass: 138.91, group: 3, period: 6, atomicNumber: 57 },
  { symbol: 'Ce', name: 'Cerium', atomicMass: 140.12, group: 3, period: 6, atomicNumber: 58 },
  { symbol: 'Pr', name: 'Praseodymium', atomicMass: 140.91, group: 3, period: 6, atomicNumber: 59 },
  { symbol: 'Nd', name: 'Neodymium', atomicMass: 144.24, group: 3, period: 6, atomicNumber: 60 },
  { symbol: 'Pm', name: 'Promethium', atomicMass: 144.91, group: 3, period: 6, atomicNumber: 61 },
  { symbol: 'Sm', name: 'Samarium', atomicMass: 150.36, group: 3, period: 6, atomicNumber: 62 },
  { symbol: 'Eu', name: 'Europium', atomicMass: 151.96, group: 3, period: 6, atomicNumber: 63 },
  { symbol: 'Gd', name: 'Gadolinium', atomicMass: 157.25, group: 3, period: 6, atomicNumber: 64 },
  { symbol: 'Tb', name: 'Terbium', atomicMass: 158.93, group: 3, period: 6, atomicNumber: 65 },
  { symbol: 'Dy', name: 'Dysprosium', atomicMass: 162.50, group: 3, period: 6, atomicNumber: 66 },
  { symbol: 'Ho', name: 'Holmium', atomicMass: 164.93, group: 3, period: 6, atomicNumber: 67 },
  { symbol: 'Er', name: 'Erbium', atomicMass: 167.26, group: 3, period: 6, atomicNumber: 68 },
  { symbol: 'Tm', name: 'Thulium', atomicMass: 168.93, group: 3, period: 6, atomicNumber: 69 },
  { symbol: 'Yb', name: 'Ytterbium', atomicMass: 173.05, group: 3, period: 6, atomicNumber: 70 },
  { symbol: 'Lu', name: 'Lutetium', atomicMass: 174.97, group: 3, period: 6, atomicNumber: 71 },
  // Continue Period 6
  { symbol: 'Hf', name: 'Hafnium', atomicMass: 178.49, group: 4, period: 6, atomicNumber: 72 },
  { symbol: 'Ta', name: 'Tantalum', atomicMass: 180.95, group: 5, period: 6, atomicNumber: 73 },
  { symbol: 'W', name: 'Tungsten', atomicMass: 183.84, group: 6, period: 6, atomicNumber: 74 },
  { symbol: 'Re', name: 'Rhenium', atomicMass: 186.21, group: 7, period: 6, atomicNumber: 75 },
  { symbol: 'Os', name: 'Osmium', atomicMass: 190.23, group: 8, period: 6, atomicNumber: 76 },
  { symbol: 'Ir', name: 'Iridium', atomicMass: 192.22, group: 9, period: 6, atomicNumber: 77 },
  { symbol: 'Pt', name: 'Platinum', atomicMass: 195.08, group: 10, period: 6, atomicNumber: 78 },
  { symbol: 'Au', name: 'Gold', atomicMass: 196.97, group: 11, period: 6, atomicNumber: 79 },
  { symbol: 'Hg', name: 'Mercury', atomicMass: 200.59, group: 12, period: 6, atomicNumber: 80 },
  { symbol: 'Tl', name: 'Thallium', atomicMass: 204.38, group: 13, period: 6, atomicNumber: 81 },
  { symbol: 'Pb', name: 'Lead', atomicMass: 207.2, group: 14, period: 6, atomicNumber: 82 },
  { symbol: 'Bi', name: 'Bismuth', atomicMass: 208.98, group: 15, period: 6, atomicNumber: 83 },
  { symbol: 'Po', name: 'Polonium', atomicMass: 208.98, group: 16, period: 6, atomicNumber: 84 },
  { symbol: 'At', name: 'Astatine', atomicMass: 209.99, group: 17, period: 6, atomicNumber: 85 },
  { symbol: 'Rn', name: 'Radon', atomicMass: 222.02, group: 18, period: 6, atomicNumber: 86 },
  
  // Period 7
  { symbol: 'Fr', name: 'Francium', atomicMass: 223.02, group: 1, period: 7, atomicNumber: 87 },
  { symbol: 'Ra', name: 'Radium', atomicMass: 226.03, group: 2, period: 7, atomicNumber: 88 },
  // Actinides (shown separately)
  { symbol: 'Ac', name: 'Actinium', atomicMass: 227.03, group: 3, period: 7, atomicNumber: 89 },
  { symbol: 'Th', name: 'Thorium', atomicMass: 232.04, group: 3, period: 7, atomicNumber: 90 },
  { symbol: 'Pa', name: 'Protactinium', atomicMass: 231.04, group: 3, period: 7, atomicNumber: 91 },
  { symbol: 'U', name: 'Uranium', atomicMass: 238.03, group: 3, period: 7, atomicNumber: 92 },
  { symbol: 'Np', name: 'Neptunium', atomicMass: 237.05, group: 3, period: 7, atomicNumber: 93 },
  { symbol: 'Pu', name: 'Plutonium', atomicMass: 244.06, group: 3, period: 7, atomicNumber: 94 },
  { symbol: 'Am', name: 'Americium', atomicMass: 243.06, group: 3, period: 7, atomicNumber: 95 },
  { symbol: 'Cm', name: 'Curium', atomicMass: 247.07, group: 3, period: 7, atomicNumber: 96 },
  { symbol: 'Bk', name: 'Berkelium', atomicMass: 247.07, group: 3, period: 7, atomicNumber: 97 },
  { symbol: 'Cf', name: 'Californium', atomicMass: 251.08, group: 3, period: 7, atomicNumber: 98 },
  { symbol: 'Es', name: 'Einsteinium', atomicMass: 252.08, group: 3, period: 7, atomicNumber: 99 },
  { symbol: 'Fm', name: 'Fermium', atomicMass: 257.10, group: 3, period: 7, atomicNumber: 100 },
  { symbol: 'Md', name: 'Mendelevium', atomicMass: 258.10, group: 3, period: 7, atomicNumber: 101 },
  { symbol: 'No', name: 'Nobelium', atomicMass: 259.10, group: 3, period: 7, atomicNumber: 102 },
  { symbol: 'Lr', name: 'Lawrencium', atomicMass: 262.11, group: 3, period: 7, atomicNumber: 103 },
  // Continue Period 7
  { symbol: 'Rf', name: 'Rutherfordium', atomicMass: 267.12, group: 4, period: 7, atomicNumber: 104 },
  { symbol: 'Db', name: 'Dubnium', atomicMass: 268.13, group: 5, period: 7, atomicNumber: 105 },
  { symbol: 'Sg', name: 'Seaborgium', atomicMass: 271.13, group: 6, period: 7, atomicNumber: 106 },
  { symbol: 'Bh', name: 'Bohrium', atomicMass: 272.14, group: 7, period: 7, atomicNumber: 107 },
  { symbol: 'Hs', name: 'Hassium', atomicMass: 270.13, group: 8, period: 7, atomicNumber: 108 },
  { symbol: 'Mt', name: 'Meitnerium', atomicMass: 276.15, group: 9, period: 7, atomicNumber: 109 },
  { symbol: 'Ds', name: 'Darmstadtium', atomicMass: 281.16, group: 10, period: 7, atomicNumber: 110 },
  { symbol: 'Rg', name: 'Roentgenium', atomicMass: 280.16, group: 11, period: 7, atomicNumber: 111 },
  { symbol: 'Cn', name: 'Copernicium', atomicMass: 285.17, group: 12, period: 7, atomicNumber: 112 },
  { symbol: 'Nh', name: 'Nihonium', atomicMass: 284.18, group: 13, period: 7, atomicNumber: 113 },
  { symbol: 'Fl', name: 'Flerovium', atomicMass: 289.19, group: 14, period: 7, atomicNumber: 114 },
  { symbol: 'Mc', name: 'Moscovium', atomicMass: 288.19, group: 15, period: 7, atomicNumber: 115 },
  { symbol: 'Lv', name: 'Livermorium', atomicMass: 293.20, group: 16, period: 7, atomicNumber: 116 },
  { symbol: 'Ts', name: 'Tennessine', atomicMass: 294.21, group: 17, period: 7, atomicNumber: 117 },
  { symbol: 'Og', name: 'Oganesson', atomicMass: 294.21, group: 18, period: 7, atomicNumber: 118 },
];

export function PeriodicTable({ isOpen, onClose, onElementSelect }: PeriodicTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [elementDetails, setElementDetails] = useState(null);

  if (!isOpen) return null;

  const filteredElements = periodicTableData.filter(
    element =>
      element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getElementColor = (element: ElementData) => {
    const { group, atomicNumber } = element;
    
    // Lanthanides (57-71)
    if (atomicNumber >= 57 && atomicNumber <= 71) {
      return 'bg-pink-400 hover:bg-pink-500 text-white';
    }
    // Actinides (89-103)
    if (atomicNumber >= 89 && atomicNumber <= 103) {
      return 'bg-purple-400 hover:bg-purple-500 text-white';
    }
    // Alkali metals
    if (group === 1 && atomicNumber > 1) return 'bg-red-400 hover:bg-red-500 text-white';
    // Alkaline earth metals
    if (group === 2) return 'bg-orange-400 hover:bg-orange-500 text-white';
    // Transition metals
    if (group >= 3 && group <= 12) return 'bg-yellow-400 hover:bg-yellow-500 text-black';
    // Post-transition metals
    if ((group >= 13 && group <= 16 && atomicNumber >= 13) || 
        [49, 50, 81, 82, 83, 113, 114, 115, 116].includes(atomicNumber)) {
      return 'bg-green-400 hover:bg-green-500 text-white';
    }
    // Metalloids
    if ([5, 14, 32, 33, 51, 52].includes(atomicNumber)) {
      return 'bg-teal-400 hover:bg-teal-500 text-white';
    }
    // Nonmetals
    if ([1, 6, 7, 8, 15, 16, 34].includes(atomicNumber)) {
      return 'bg-blue-400 hover:bg-blue-500 text-white';
    }
    // Halogens
    if (group === 17) return 'bg-indigo-400 hover:bg-indigo-500 text-white';
    // Noble gases
    if (group === 18) return 'bg-purple-400 hover:bg-purple-500 text-white';
    
    return 'bg-gray-400 hover:bg-gray-500 text-white';
  };

  const handleElementClick = (element: ElementData) => {
    setSelectedElement(element);
    onElementSelect(element.symbol);
  };

  const handleElementRightClick = (e: React.MouseEvent, element: ElementData) => {
    e.preventDefault();
    const details = getElementDetails(element.symbol);
    if (details) {
      setElementDetails(details);
      setDetailsModalOpen(true);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const createPeriodicTableGrid = () => {
    const grid = [];
    const maxPeriods = 7;
    const maxGroups = 18;

    // Main periodic table (periods 1-7, excluding lanthanides and actinides from their normal positions)
    for (let period = 1; period <= maxPeriods; period++) {
      const row = [];
      for (let group = 1; group <= maxGroups; group++) {
        let element = periodicTableData.find(
          el => el.period === period && el.group === group && 
          !(el.atomicNumber >= 58 && el.atomicNumber <= 71) && // Exclude lanthanides from main table
          !(el.atomicNumber >= 90 && el.atomicNumber <= 103)   // Exclude actinides from main table
        );

        // Special handling for La and Ac positions (show them in main table)
        if (period === 6 && group === 3) {
          element = periodicTableData.find(el => el.atomicNumber === 57); // La
        }
        if (period === 7 && group === 3) {
          element = periodicTableData.find(el => el.atomicNumber === 89); // Ac
        }

        if (element) {
          const isVisible = filteredElements.includes(element);
          const hasDetails = getElementDetails(element.symbol) !== null;
          
          row.push(
            <div key={element.symbol} className="relative group">
              <button
                onClick={() => handleElementClick(element)}
                onContextMenu={(e) => handleElementRightClick(e, element)}
                className={`w-12 h-12 border border-gray-300 dark:border-gray-600 rounded text-xs font-bold transition-all duration-200 hover:scale-110 hover:shadow-lg ${
                  getElementColor(element)
                } ${!isVisible ? 'opacity-30' : ''} relative`}
                title={`${element.name} (${element.symbol}) - ${element.atomicMass} g/mol - Atomic #${element.atomicNumber}${hasDetails ? ' • Right-click for details' : ''}`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-[8px] opacity-80">{element.atomicNumber}</div>
                  <div className="text-xs font-bold">{element.symbol}</div>
                  <div className="text-[7px] opacity-70">{element.atomicMass}</div>
                </div>
                {hasDetails && (
                  <Info className="absolute -top-1 -right-1 w-3 h-3 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            </div>
          );
        } else {
          // Empty cell for proper spacing
          row.push(
            <div
              key={`${period}-${group}`}
              className="w-12 h-12"
            />
          );
        }
      }
      grid.push(
        <div key={period} className="flex justify-center gap-1">
          {row}
        </div>
      );
    }

    // Add spacing
    grid.push(
      <div key="spacer" className="h-4" />
    );

    // Lanthanides row
    const lanthanides = periodicTableData.filter(el => el.atomicNumber >= 57 && el.atomicNumber <= 71);
    const lanthanidesRow = lanthanides.map(element => {
      const isVisible = filteredElements.includes(element);
      const hasDetails = getElementDetails(element.symbol) !== null;
      
      return (
        <div key={element.symbol} className="relative group">
          <button
            onClick={() => handleElementClick(element)}
            onContextMenu={(e) => handleElementRightClick(e, element)}
            className={`w-12 h-12 border border-gray-300 dark:border-gray-600 rounded text-xs font-bold transition-all duration-200 hover:scale-110 hover:shadow-lg ${
              getElementColor(element)
            } ${!isVisible ? 'opacity-30' : ''} relative`}
            title={`${element.name} (${element.symbol}) - ${element.atomicMass} g/mol - Atomic #${element.atomicNumber}${hasDetails ? ' • Right-click for details' : ''}`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-[8px] opacity-80">{element.atomicNumber}</div>
              <div className="text-xs font-bold">{element.symbol}</div>
              <div className="text-[7px] opacity-70">{element.atomicMass}</div>
            </div>
            {hasDetails && (
              <Info className="absolute -top-1 -right-1 w-3 h-3 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>
      );
    });

    grid.push(
      <div key="lanthanides" className="flex justify-center gap-1">
        <div className="w-12 h-12 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
          57-71
        </div>
        {lanthanidesRow}
      </div>
    );

    // Actinides row
    const actinides = periodicTableData.filter(el => el.atomicNumber >= 89 && el.atomicNumber <= 103);
    const actinidesRow = actinides.map(element => {
      const isVisible = filteredElements.includes(element);
      const hasDetails = getElementDetails(element.symbol) !== null;
      
      return (
        <div key={element.symbol} className="relative group">
          <button
            onClick={() => handleElementClick(element)}
            onContextMenu={(e) => handleElementRightClick(e, element)}
            className={`w-12 h-12 border border-gray-300 dark:border-gray-600 rounded text-xs font-bold transition-all duration-200 hover:scale-110 hover:shadow-lg ${
              getElementColor(element)
            } ${!isVisible ? 'opacity-30' : ''} relative`}
            title={`${element.name} (${element.symbol}) - ${element.atomicMass} g/mol - Atomic #${element.atomicNumber}${hasDetails ? ' • Right-click for details' : ''}`}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-[8px] opacity-80">{element.atomicNumber}</div>
              <div className="text-xs font-bold">{element.symbol}</div>
              <div className="text-[7px] opacity-70">{element.atomicMass}</div>
            </div>
            {hasDetails && (
              <Info className="absolute -top-1 -right-1 w-3 h-3 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>
      );
    });

    grid.push(
      <div key="actinides" className="flex justify-center gap-1">
        <div className="w-12 h-12 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">
          89-103
        </div>
        {actinidesRow}
      </div>
    );

    return grid;
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Interactive Periodic Table</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 overflow-auto max-h-[calc(95vh-120px)]">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search elements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
                Click to add to formula • Right-click for detailed information
              </div>
            </div>

            {/* Periodic Table Grid */}
            <div className="space-y-1 mb-6">
              {createPeriodicTableGrid()}
            </div>

            {/* Legend */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">Element Groups</h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Alkali Metals</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Alkaline Earth</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Transition Metals</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Post-transition Metals</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-teal-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Metalloids</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Nonmetals</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-indigo-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Halogens</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Noble Gases</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-pink-400 rounded mr-2"></div>
                  <span className="text-gray-700 dark:text-gray-300">Lanthanides</span>
                </div>
              </div>
            </div>

            {selectedElement && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {selectedElement.name} ({selectedElement.symbol})
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Atomic Number:</span>
                    <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                      {selectedElement.atomicNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Atomic Mass:</span>
                    <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                      {selectedElement.atomicMass} g/mol
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Group:</span>
                    <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                      {selectedElement.group}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Period:</span>
                    <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">
                      {selectedElement.period}
                    </span>
                  </div>
                </div>
                {getElementDetails(selectedElement.symbol) && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        const details = getElementDetails(selectedElement.symbol);
                        if (details) {
                          setElementDetails(details);
                          setDetailsModalOpen(true);
                        }
                      }}
                      className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Info className="w-4 h-4 mr-1" />
                      View Detailed Information
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ElementDetailsModal
        element={elementDetails}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
      />
    </>
  );
}