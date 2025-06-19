import React from 'react';
import { Info } from 'lucide-react';
import { ElementCalculation } from '../utils/molarMassCalculator';
import { getElementDetails } from '../data/elementDetails';
import { ThemeSettings } from '../hooks/useThemeSettings';

interface ElementCardProps {
  element: ElementCalculation;
  index: number;
  onShowDetails?: (symbol: string) => void;
  settings: ThemeSettings;
}

export function ElementCard({ element, index, onShowDetails, settings }: ElementCardProps) {
  const hasDetails = getElementDetails(element.element) !== null;

  return (
    <div 
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br from-${settings.primaryColor}-500 to-${settings.secondaryColor}-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
            {element.element}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{element.elementName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Atomic Mass: {element.atomicMass} g/mol</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className={`text-2xl font-bold text-${settings.secondaryColor}-600 dark:text-${settings.secondaryColor}-400`}>×{element.count}</div>
          </div>
          {hasDetails && onShowDetails && (
            <button
              onClick={() => onShowDetails(element.element)}
              className={`p-1 text-${settings.primaryColor}-600 dark:text-${settings.primaryColor}-400 hover:text-${settings.primaryColor}-700 dark:hover:text-${settings.primaryColor}-300 transition-colors`}
              title="View detailed element information"
            >
              <Info className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Calculation:</span>
          <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
            {element.atomicMass} × {element.count} = {element.subtotal.toFixed(2)} g/mol
          </span>
        </div>
        <div className="mt-2 text-right">
          <span className={`text-lg font-bold text-${settings.primaryColor}-600 dark:text-${settings.primaryColor}-400`}>
            {element.subtotal.toFixed(2)} g/mol
          </span>
        </div>
      </div>
    </div>
  );
}