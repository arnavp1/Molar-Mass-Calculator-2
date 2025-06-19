import React, { useState } from 'react';
import { Calculator, ArrowRightLeft } from 'lucide-react';

interface UnitConverterProps {
  molarMass: number;
  formula: string;
}

export function UnitConverter({ molarMass, formula }: UnitConverterProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [conversionType, setConversionType] = useState<'massToMoles' | 'molesToMass'>('massToMoles');

  const handleConversion = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) return null;

    if (conversionType === 'massToMoles') {
      return value / molarMass;
    } else {
      return value * molarMass;
    }
  };

  const result = handleConversion();

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
      <div className="flex items-center mb-4">
        <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Unit Converter</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Conversion Type
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setConversionType('massToMoles')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                conversionType === 'massToMoles'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Mass → Moles
            </button>
            <button
              onClick={() => setConversionType('molesToMass')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                conversionType === 'molesToMass'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Moles → Mass
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {conversionType === 'massToMoles' ? 'Mass (g)' : 'Moles (mol)'}
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Enter ${conversionType === 'massToMoles' ? 'mass in grams' : 'number of moles'}`}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {result !== null && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ArrowRightLeft className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Result:</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {result.toFixed(4)} {conversionType === 'massToMoles' ? 'mol' : 'g'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  of {formula}
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 font-mono">
              {conversionType === 'massToMoles' 
                ? `${inputValue} g ÷ ${molarMass} g/mol = ${result.toFixed(4)} mol`
                : `${inputValue} mol × ${molarMass} g/mol = ${result.toFixed(4)} g`
              }
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p><strong>Molar Mass of {formula}:</strong> {molarMass} g/mol</p>
          <p><strong>Formula:</strong> {conversionType === 'massToMoles' ? 'moles = mass ÷ molar mass' : 'mass = moles × molar mass'}</p>
        </div>
      </div>
    </div>
  );
}