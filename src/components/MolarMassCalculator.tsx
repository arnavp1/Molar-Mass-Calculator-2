import React, { useState, useEffect } from 'react';
import { Calculator, Beaker as Beaker2, Table } from 'lucide-react';
import { parseFormula } from '../utils/formulaParser';
import { calculateMolarMass, MolarMassResult } from '../utils/molarMassCalculator';
import { getElementDetails } from '../data/elementDetails';
import { ElementCard } from './ElementCard';
import { DarkModeToggle } from './DarkModeToggle';
import { CalculationHistory } from './CalculationHistory';
import { PeriodicTable } from './PeriodicTable';
import { UnitConverter } from './UnitConverter';
import { EnhancedFormulaInput } from './EnhancedFormulaInput';
import { ElementDetailsModal } from './ElementDetailsModal';
import { useDarkMode } from '../hooks/useDarkMode';
import { useCalculationHistory } from '../hooks/useCalculationHistory';

export function MolarMassCalculator() {
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState<MolarMassResult | null>(null);
  const [parseResult, setParseResult] = useState({ elements: [], isValid: false });
  const [isPeriodicTableOpen, setIsPeriodicTableOpen] = useState(false);
  const [elementDetailsModalOpen, setElementDetailsModalOpen] = useState(false);
  const [selectedElementDetails, setSelectedElementDetails] = useState(null);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { history, addCalculation, removeEntry, clearHistory } = useCalculationHistory();

  useEffect(() => {
    if (!formula.trim()) {
      setResult(null);
      setParseResult({ elements: [], isValid: false });
      return;
    }

    const currentParseResult = parseFormula(formula);
    setParseResult(currentParseResult);
    
    if (currentParseResult.isValid) {
      const molarMassResult = calculateMolarMass(currentParseResult.elements);
      setResult(molarMassResult);
      
      // Add to history
      addCalculation(formula, molarMassResult.totalMass);
    } else {
      setResult(null);
    }
  }, [formula, addCalculation]);

  const handleElementSelect = (element: string) => {
    setFormula(prev => prev + element);
    setIsPeriodicTableOpen(false);
  };

  const handleHistorySelect = (selectedFormula: string) => {
    setFormula(selectedFormula);
  };

  const handleShowElementDetails = (symbol: string) => {
    const details = getElementDetails(symbol);
    if (details) {
      setSelectedElementDetails(details);
      setElementDetailsModalOpen(true);
    }
  };

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
          <EnhancedFormulaInput
            formula={formula}
            onFormulaChange={setFormula}
            parseResult={parseResult}
            onOpenPeriodicTable={() => setIsPeriodicTableOpen(true)}
          />
        </div>

        {/* Results Section */}
        {result && (
          <div className="max-w-6xl mx-auto mb-8">
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
                  <ElementCard 
                    key={element.element} 
                    element={element} 
                    index={index}
                    onShowDetails={handleShowElementDetails}
                  />
                ))}
              </div>
            </div>

            {/* Unit Converter and Calculation Summary - Side by Side */}
            <div className="mb-8">
              {/* Full Width Calculation Summary */}
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20 mb-8">
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

              {/* Unit Converter and Calculation History Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UnitConverter molarMass={result.totalMass} formula={formula} />
                
                <CalculationHistory
                  history={history}
                  onSelectFormula={handleHistorySelect}
                  onClearHistory={clearHistory}
                  onRemoveEntry={removeEntry}
                />
              </div>
            </div>
          </div>
        )}

        {/* When no formula is entered - show history at bottom and instructions above */}
        {!formula.trim() && (
          <>
            {/* Instructions for empty state */}
            <div className="max-w-2xl mx-auto text-center mb-8">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 dark:border-gray-700/20">
                <Beaker2 className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">Ready to Calculate</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Enter a molecular formula above to see its molar mass calculation with detailed breakdown.
                </p>
                <button
                  onClick={() => setIsPeriodicTableOpen(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Table className="w-4 h-4 mr-2" />
                  Open Periodic Table
                </button>
              </div>
            </div>

            {/* Calculation History at bottom when no formula */}
            <div className="max-w-4xl mx-auto">
              <CalculationHistory
                history={history}
                onSelectFormula={handleHistorySelect}
                onClearHistory={clearHistory}
                onRemoveEntry={removeEntry}
              />
            </div>
          </>
        )}
      </div>

      {/* Periodic Table Modal */}
      <PeriodicTable
        isOpen={isPeriodicTableOpen}
        onClose={() => setIsPeriodicTableOpen(false)}
        onElementSelect={handleElementSelect}
      />

      {/* Element Details Modal */}
      <ElementDetailsModal
        element={selectedElementDetails}
        isOpen={elementDetailsModalOpen}
        onClose={() => setElementDetailsModalOpen(false)}
      />

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