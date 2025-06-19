import React, { useState, useEffect } from 'react';
import { Calculator, Beaker as Beaker2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { parseFormula } from '../utils/formulaParser';
import { calculateMolarMass, MolarMassResult } from '../utils/molarMassCalculator';
import { ElementCard } from './ElementCard';
import { DarkModeToggle } from './DarkModeToggle';
import { useDarkMode } from '../hooks/useDarkMode';

export function MolarMassCalculator() {
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState<MolarMassResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isValid, setIsValid] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    if (!formula.trim()) {
      setResult(null);
      setError('');
      setIsValid(false);
      return;
    }

    const parseResult = parseFormula(formula);
    
    if (parseResult.isValid) {
      const molarMassResult = calculateMolarMass(parseResult.elements);
      setResult(molarMassResult);
      setError('');
      setIsValid(true);
    } else {
      setResult(null);
      setError(parseResult.error || 'Invalid formula');
      setIsValid(false);
    }
  }, [formula]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
      <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg">
              <Beaker2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Molecular Mass Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enter a molecular formula to calculate its molar mass with detailed breakdown
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
            <label htmlFor="formula" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Molecular Formula
            </label>
            <div className="relative">
              <input
                type="text"
                id="formula"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="e.g., H2SO4, Ca(OH)2, C6H12O6"
                className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-gray-700/50 dark:text-white ${
                  formula.trim() === '' 
                    ? 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-400/30' 
                    : isValid 
                      ? 'border-green-400 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-400/30 bg-green-50 dark:bg-green-900/20' 
                      : 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-400/30 bg-red-50 dark:bg-red-900/20'
                }`}
              />
              {formula.trim() !== '' && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isValid ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-500" />
                  )}
                </div>
              )}
            </div>
            
            {error && (
              <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 dark:text-red-300">{error}</span>
              </div>
            )}

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              <p><strong>Examples:</strong> H2O, NaCl, C6H12O6, Ca(OH)2, Al2(SO4)3</p>
              <p><strong>Tips:</strong> Use proper capitalization (H2O not h2o), parentheses for polyatomic ions</p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="max-w-6xl mx-auto">
            {/* Total Molar Mass */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl p-8 mb-8 text-white shadow-2xl">
              <div className="flex items-center justify-center mb-4">
                <Calculator className="w-12 h-12 mr-4" />
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Total Molar Mass</h2>
                  <div className="text-5xl font-bold">
                    {result.totalMass} <span className="text-2xl">g/mol</span>
                  </div>
                  <p className="text-green-100 mt-2">Formula: {formula}</p>
                </div>
              </div>
            </div>

            {/* Element Breakdown */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                Element Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.breakdown.map((element, index) => (
                  <ElementCard key={element.element} element={element} index={index} />
                ))}
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Calculation Summary</h3>
              <div className="space-y-2">
                {result.breakdown.map((element) => (
                  <div key={element.element} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {element.element} ({element.elementName})
                    </span>
                    <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                      {element.atomicMass} × {element.count} = {element.subtotal.toFixed(2)} g/mol
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 dark:border-gray-600 font-bold text-lg">
                  <span className="text-gray-800 dark:text-gray-200">Total Molar Mass:</span>
                  <span className="text-green-600 dark:text-green-400">{result.totalMass} g/mol</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions for empty state */}
        {!formula.trim() && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20">
              <Beaker2 className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Ready to Calculate</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter a molecular formula above to see its molar mass calculation with detailed breakdown.
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}