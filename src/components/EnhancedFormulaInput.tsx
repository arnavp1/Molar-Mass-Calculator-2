import React from 'react';
import { AlertCircle, CheckCircle2, Table } from 'lucide-react';
import { ParseResult } from '../utils/formulaParser';

interface EnhancedFormulaInputProps {
  formula: string;
  onFormulaChange: (formula: string) => void;
  parseResult: ParseResult;
  onOpenPeriodicTable: () => void;
}

export function EnhancedFormulaInput({ 
  formula, 
  onFormulaChange, 
  parseResult,
  onOpenPeriodicTable 
}: EnhancedFormulaInputProps) {
  const { isValid, error, errorPosition } = parseResult;

  const renderHighlightedFormula = () => {
    if (!formula.trim() || isValid || errorPosition === undefined) {
      return formula;
    }

    const beforeError = formula.slice(0, errorPosition);
    const errorChar = formula[errorPosition];
    const afterError = formula.slice(errorPosition + 1);

    return (
      <>
        {beforeError}
        <span className="bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-1 rounded">
          {errorChar}
        </span>
        {afterError}
      </>
    );
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
      <label htmlFor="formula" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Molecular Formula
      </label>
      <div className="relative">
        <input
          type="text"
          id="formula"
          value={formula}
          onChange={(e) => onFormulaChange(e.target.value)}
          placeholder="e.g., H2SO4, Ca(OH)2, C6H12O6"
          className={`w-full px-4 py-3 pr-20 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 dark:bg-gray-700/50 dark:text-white ${
            formula.trim() === '' 
              ? 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-400/30' 
              : isValid 
                ? 'border-green-400 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-400/30 bg-green-50 dark:bg-green-900/20' 
                : 'border-red-400 focus:border-red-500 focus:ring-red-200 dark:focus:ring-red-400/30 bg-red-50 dark:bg-red-900/20'
          }`}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <button
            onClick={onOpenPeriodicTable}
            className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            title="Open Periodic Table"
          >
            <Table className="w-5 h-5" />
          </button>
          {formula.trim() !== '' && (
            <div>
              {isValid ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Formula preview with highlighting */}
      {formula.trim() && !isValid && errorPosition !== undefined && (
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Formula preview:</div>
          <div className="font-mono text-lg">
            {renderHighlightedFormula()}
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
          <span className="text-red-700 dark:text-red-300">{error}</span>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <p><strong>Examples:</strong> H2O, NaCl, C6H12O6, Ca(OH)2, Al2(SO4)3</p>
        <p><strong>Tips:</strong> Use proper capitalization (H2O not h2o), parentheses for polyatomic ions</p>
        <p><strong>Click the table icon</strong> to open the interactive periodic table</p>
      </div>
    </div>
  );
}