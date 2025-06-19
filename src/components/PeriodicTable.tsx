import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { atomicMasses, elementNames } from '../data/atomicMasses';

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
}

// Complete periodic table data with proper positioning
const periodicTableData: ElementData[] = [
  // Period 1
  { symbol: 'H', name: 'Hydrogen', atomicMass: 1.008, group: 1, period: 1 },
  { symbol: 'He', name: 'Helium', atomicMass: 4.003, group: 18, period: 1 },
  
  // Period 2
  { symbol: 'Li', name: 'Lithium', atomicMass: 6.94, group: 1, period: 2 },
  { symbol: 'Be', name: 'Beryllium', atomicMass: 9.012, group: 2, period: 2 },
  { symbol: 'B', name: 'Boron', atomicMass: 10.81, group: 13, period: 2 },
  { symbol: 'C', name: 'Carbon', atomicMass: 12.01, group: 14, period: 2 },
  { symbol: 'N', name: 'Nitrogen', atomicMass: 14.01, group: 15, period: 2 },
  { symbol: 'O', name: 'Oxygen', atomicMass: 16.00, group: 16, period: 2 },
  { symbol: 'F', name: 'Fluorine', atomicMass: 19.00, group: 17, period: 2 },
  { symbol: 'Ne', name: 'Neon', atomicMass: 20.18, group: 18, period: 2 },
  
  // Period 3
  { symbol: 'Na', name: 'Sodium', atomicMass: 22.99, group: 1, period: 3 },
  { symbol: 'Mg', name: 'Magnesium', atomicMass: 24.31, group: 2, period: 3 },
  { symbol: 'Al', name: 'Aluminum', atomicMass: 26.98, group: 13, period: 3 },
  { symbol: 'Si', name: 'Silicon', atomicMass: 28.09, group: 14, period: 3 },
  { symbol: 'P', name: 'Phosphorus', atomicMass: 30.97, group: 15, period: 3 },
  { symbol: 'S', name: 'Sulfur', atomicMass: 32.07, group: 16, period: 3 },
  { symbol: 'Cl', name: 'Chlorine', atomicMass: 35.45, group: 17, period: 3 },
  { symbol: 'Ar', name: 'Argon', atomicMass: 39.95, group: 18, period: 3 },
  
  // Period 4
  { symbol: 'K', name: 'Potassium', atomicMass: 39.10, group: 1, period: 4 },
  { symbol: 'Ca', name: 'Calcium', atomicMass: 40.08, group: 2, period: 4 },
  { symbol: 'Sc', name: 'Scandium', atomicMass: 44.96, group: 3, period: 4 },
  { symbol: 'Ti', name: 'Titanium', atomicMass: 47.87, group: 4, period: 4 },
  { symbol: 'V', name: 'Vanadium', atomicMass: 50.94, group: 5, period: 4 },
  { symbol: 'Cr', name: 'Chromium', atomicMass: 52.00, group: 6, period: 4 },
  { symbol: 'Mn', name: 'Manganese', atomicMass: 54.94, group: 7, period: 4 },
  { symbol: 'Fe', name: 'Iron', atomicMass: 55.85, group: 8, period: 4 },
  { symbol: 'Co', name: 'Cobalt', atomicMass: 58.93, group: 9, period: 4 },
  { symbol: 'Ni', name: 'Nickel', atomicMass: 58.69, group: 10, period: 4 },
  { symbol: 'Cu', name: 'Copper', atomicMass: 63.55, group: 11, period: 4 },
  { symbol: 'Zn', name: 'Zinc', atomicMass: 65.38, group: 12, period: 4 },
  { symbol: 'Ga', name: 'Gallium', atomicMass: 69.72, group: 13, period: 4 },
  { symbol: 'Ge', name: 'Germanium', atomicMass: 72.63, group: 14, period: 4 },
  { symbol: 'As', name: 'Arsenic', atomicMass: 74.92, group: 15, period: 4 },
  { symbol: 'Se', name: 'Selenium', atomicMass: 78.96, group: 16, period: 4 },
  { symbol: 'Br', name: 'Bromine', atomicMass: 79.90, group: 17, period: 4 },
  { symbol: 'Kr', name: 'Krypton', atomicMass: 83.80, group: 18, period: 4 },
  
  // Period 5
  { symbol: 'Rb', name: 'Rubidium', atomicMass: 85.47, group: 1, period: 5 },
  { symbol: 'Sr', name: 'Strontium', atomicMass: 87.62, group: 2, period: 5 },
  { symbol: 'Y', name: 'Yttrium', atomicMass: 88.91, group: 3, period: 5 },
  { symbol: 'Zr', name: 'Zirconium', atomicMass: 91.22, group: 4, period: 5 },
  { symbol: 'Nb', name: 'Niobium', atomicMass: 92.91, group: 5, period: 5 },
  { symbol: 'Mo', name: 'Molybdenum', atomicMass: 95.96, group: 6, period: 5 },
  { symbol: 'Tc', name: 'Technetium', atomicMass: 98.91, group: 7, period: 5 },
  { symbol: 'Ru', name: 'Ruthenium', atomicMass: 101.07, group: 8, period: 5 },
  { symbol: 'Rh', name: 'Rhodium', atomicMass: 102.91, group: 9, period: 5 },
  { symbol: 'Pd', name: 'Palladium', atomicMass: 106.42, group: 10, period: 5 },
  { symbol: 'Ag', name: 'Silver', atomicMass: 107.87, group: 11, period: 5 },
  { symbol: 'Cd', name: 'Cadmium', atomicMass: 112.41, group: 12, period: 5 },
  { symbol: 'In', name: 'Indium', atomicMass: 114.82, group: 13, period: 5 },
  { symbol: 'Sn', name: 'Tin', atomicMass: 118.71, group: 14, period: 5 },
  { symbol: 'Sb', name: 'Antimony', atomicMass: 121.76, group: 15, period: 5 },
  { symbol: 'Te', name: 'Tellurium', atomicMass: 127.60, group: 16, period: 5 },
  { symbol: 'I', name: 'Iodine', atomicMass: 126.90, group: 17, period: 5 },
  { symbol: 'Xe', name: 'Xenon', atomicMass: 131.29, group: 18, period: 5 },
  
  // Period 6
  { symbol: 'Cs', name: 'Cesium', atomicMass: 132.91, group: 1, period: 6 },
  { symbol: 'Ba', name: 'Barium', atomicMass: 137.33, group: 2, period: 6 },
  { symbol: 'Hf', name: 'Hafnium', atomicMass: 178.49, group: 4, period: 6 },
  { symbol: 'Ta', name: 'Tantalum', atomicMass: 180.95, group: 5, period: 6 },
  { symbol: 'W', name: 'Tungsten', atomicMass: 183.84, group: 6, period: 6 },
  { symbol: 'Re', name: 'Rhenium', atomicMass: 186.21, group: 7, period: 6 },
  { symbol: 'Os', name: 'Osmium', atomicMass: 190.23, group: 8, period: 6 },
  { symbol: 'Ir', name: 'Iridium', atomicMass: 192.22, group: 9, period: 6 },
  { symbol: 'Pt', name: 'Platinum', atomicMass: 195.08, group: 10, period: 6 },
  { symbol: 'Au', name: 'Gold', atomicMass: 196.97, group: 11, period: 6 },
  { symbol: 'Hg', name: 'Mercury', atomicMass: 200.59, group: 12, period: 6 },
  { symbol: 'Tl', name: 'Thallium', atomicMass: 204.38, group: 13, period: 6 },
  { symbol: 'Pb', name: 'Lead', atomicMass: 207.2, group: 14, period: 6 },
  { symbol: 'Bi', name: 'Bismuth', atomicMass: 208.98, group: 15, period: 6 },
  { symbol: 'Po', name: 'Polonium', atomicMass: 208.98, group: 16, period: 6 },
  { symbol: 'At', name: 'Astatine', atomicMass: 209.99, group: 17, period: 6 },
  { symbol: 'Rn', name: 'Radon', atomicMass: 222.02, group: 18, period: 6 },
];

export function PeriodicTable({ isOpen, onClose, onElementSelect }: PeriodicTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  if (!isOpen) return null;

  const filteredElements = periodicTableData.filter(
    element =>
      element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getElementColor = (group: number) => {
    if (group === 1) return 'bg-red-400 hover:bg-red-500 text-white';
    if (group === 2) return 'bg-orange-400 hover:bg-orange-500 text-white';
    if (group >= 3 && group <= 12) return 'bg-yellow-400 hover:bg-yellow-500 text-black';
    if (group >= 13 && group <= 16) return 'bg-green-400 hover:bg-green-500 text-white';
    if (group === 17) return 'bg-blue-400 hover:bg-blue-500 text-white';
    if (group === 18) return 'bg-purple-400 hover:bg-purple-500 text-white';
    return 'bg-gray-400 hover:bg-gray-500 text-white';
  };

  const createPeriodicTableGrid = () => {
    const grid = [];
    const maxPeriods = 6;
    const maxGroups = 18;

    for (let period = 1; period <= maxPeriods; period++) {
      const row = [];
      for (let group = 1; group <= maxGroups; group++) {
        const element = periodicTableData.find(
          el => el.period === period && el.group === group
        );

        if (element) {
          const isVisible = filteredElements.includes(element);
          row.push(
            <button
              key={element.symbol}
              onClick={() => {
                setSelectedElement(element);
                onElementSelect(element.symbol);
              }}
              className={`w-12 h-12 border border-gray-300 dark:border-gray-600 rounded text-xs font-bold transition-all duration-200 hover:scale-110 hover:shadow-lg ${
                getElementColor(element.group)
              } ${!isVisible ? 'opacity-30' : ''}`}
              title={`${element.name} (${element.symbol}) - ${element.atomicMass} g/mol`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-xs font-bold">{element.symbol}</div>
                <div className="text-[8px] opacity-80">{element.atomicMass}</div>
              </div>
            </button>
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

    return grid;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Interactive Periodic Table</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
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
          </div>

          {/* Periodic Table Grid */}
          <div className="space-y-1 mb-6">
            {createPeriodicTableGrid()}
          </div>

          {/* Legend */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Element Groups</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
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
                <span className="text-gray-700 dark:text-gray-300">Metalloids</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
                <span className="text-gray-700 dark:text-gray-300">Halogens</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-400 rounded mr-2"></div>
                <span className="text-gray-700 dark:text-gray-300">Noble Gases</span>
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
            </div>
          )}

          <div className="text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}