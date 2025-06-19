import React from 'react';
import { History, X, Calculator } from 'lucide-react';
import { ThemeSettings } from '../hooks/useThemeSettings';

export interface HistoryEntry {
  id: string;
  formula: string;
  molarMass: number;
  timestamp: Date;
}

interface CalculationHistoryProps {
  history: HistoryEntry[];
  onSelectFormula: (formula: string) => void;
  onClearHistory: () => void;
  onRemoveEntry: (id: string) => void;
  settings: ThemeSettings;
}

export function CalculationHistory({ 
  history, 
  onSelectFormula, 
  onClearHistory, 
  onRemoveEntry,
  settings 
}: CalculationHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
        <div className="flex items-center mb-4">
          <History className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Calculation History</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          No calculations yet. Start by entering a molecular formula above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <History className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Calculation History</h3>
        </div>
        <button
          onClick={onClearHistory}
          className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
            onClick={() => onSelectFormula(entry.formula)}
          >
            <div className="flex items-center space-x-3">
              <Calculator className={`w-4 h-4 text-${settings.primaryColor}-600 dark:text-${settings.primaryColor}-400`} />
              <div>
                <div className="font-mono text-sm font-medium text-gray-800 dark:text-gray-200">
                  {entry.formula}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {entry.molarMass} g/mol • {entry.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveEntry(entry.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}