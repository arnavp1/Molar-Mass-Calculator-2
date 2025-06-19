import { atomicMasses, elementNames } from '../data/atomicMasses';
import { ElementCount } from './formulaParser';

export interface ElementCalculation {
  element: string;
  elementName: string;
  atomicMass: number;
  count: number;
  subtotal: number;
}

export interface MolarMassResult {
  totalMass: number;
  breakdown: ElementCalculation[];
}

export function calculateMolarMass(elements: ElementCount[]): MolarMassResult {
  const breakdown: ElementCalculation[] = [];
  let totalMass = 0;

  for (const { element, count } of elements) {
    const atomicMass = atomicMasses[element];
    const subtotal = atomicMass * count;
    
    breakdown.push({
      element,
      elementName: elementNames[element] || element,
      atomicMass,
      count,
      subtotal
    });
    
    totalMass += subtotal;
  }

  return {
    totalMass: Math.round(totalMass * 100) / 100, // Round to 2 decimal places
    breakdown
  };
}