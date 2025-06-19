import { useState, useEffect } from 'react';

export interface HistoryEntry {
  id: string;
  formula: string;
  molarMass: number;
  timestamp: Date;
}

export function useCalculationHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculationHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        const historyWithDates = parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }));
        setHistory(historyWithDates);
      } catch (error) {
        console.error('Failed to parse calculation history:', error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calculationHistory', JSON.stringify(history));
  }, [history]);

  const addCalculation = (formula: string, molarMass: number) => {
    // Don't add if the same formula already exists
    if (history.some(entry => entry.formula === formula)) {
      return;
    }

    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      formula,
      molarMass,
      timestamp: new Date()
    };

    setHistory(prev => [newEntry, ...prev].slice(0, 20)); // Keep only last 20 calculations
  };

  const removeEntry = (id: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addCalculation,
    removeEntry,
    clearHistory
  };
}