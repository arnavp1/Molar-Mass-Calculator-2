import { atomicMasses } from '../data/atomicMasses';

export interface ElementCount {
  element: string;
  count: number;
}

export interface ParseResult {
  elements: ElementCount[];
  isValid: boolean;
  error?: string;
}

export function parseFormula(formula: string): ParseResult {
  if (!formula.trim()) {
    return {
      elements: [],
      isValid: false,
      error: 'Please enter a molecular formula'
    };
  }

  // Remove spaces and validate basic format
  const cleanFormula = formula.replace(/\s/g, '');
  
  // Check for invalid characters - allow letters, numbers, and parentheses
  if (!/^[A-Za-z0-9()]+$/.test(cleanFormula)) {
    return {
      elements: [],
      isValid: false,
      error: 'Invalid characters in formula. Use only element symbols, numbers, and parentheses.'
    };
  }

  // Check that formula starts with uppercase letter
  if (!/^[A-Z]/.test(cleanFormula)) {
    return {
      elements: [],
      isValid: false,
      error: 'Formula must start with an element symbol (uppercase letter).'
    };
  }

  try {
    const elements = parseRecursive(cleanFormula);
    
    // Validate that all elements exist in our atomic masses database
    for (const { element } of elements) {
      if (!atomicMasses[element]) {
        return {
          elements: [],
          isValid: false,
          error: `Unknown element: ${element}`
        };
      }
    }

    // Combine duplicate elements
    const combinedElements = combineElements(elements);
    
    return {
      elements: combinedElements,
      isValid: true
    };
  } catch (error) {
    return {
      elements: [],
      isValid: false,
      error: error instanceof Error ? error.message : 'Invalid formula format'
    };
  }
}

function parseRecursive(formula: string, multiplier: number = 1): ElementCount[] {
  const elements: ElementCount[] = [];
  let i = 0;

  while (i < formula.length) {
    if (formula[i] === '(') {
      // Find matching closing parenthesis
      let depth = 1;
      let j = i + 1;
      while (j < formula.length && depth > 0) {
        if (formula[j] === '(') depth++;
        if (formula[j] === ')') depth--;
        j++;
      }

      if (depth > 0) {
        throw new Error('Unmatched opening parenthesis');
      }

      // Extract content inside parentheses
      const innerFormula = formula.slice(i + 1, j - 1);
      
      // Get the multiplier after the closing parenthesis
      const numberMatch = formula.slice(j).match(/^(\d+)/);
      const innerMultiplier = numberMatch ? parseInt(numberMatch[1]) : 1;
      
      // Recursively parse the content inside parentheses
      const innerElements = parseRecursive(innerFormula, multiplier * innerMultiplier);
      elements.push(...innerElements);
      
      i = j + (numberMatch ? numberMatch[1].length : 0);
    } else if (/[A-Z]/.test(formula[i])) {
      // Parse element symbol
      let elementSymbol = formula[i];
      i++;
      
      // Check for lowercase letter (part of element symbol)
      while (i < formula.length && /[a-z]/.test(formula[i])) {
        elementSymbol += formula[i];
        i++;
      }
      
      // Parse number following the element
      const numberMatch = formula.slice(i).match(/^(\d+)/);
      const count = numberMatch ? parseInt(numberMatch[1]) : 1;
      
      elements.push({
        element: elementSymbol,
        count: count * multiplier
      });
      
      i += numberMatch ? numberMatch[1].length : 0;
    } else {
      throw new Error(`Unexpected character: ${formula[i]} at position ${i + 1}`);
    }
  }

  return elements;
}

function combineElements(elements: ElementCount[]): ElementCount[] {
  const combined: Record<string, number> = {};
  
  for (const { element, count } of elements) {
    combined[element] = (combined[element] || 0) + count;
  }
  
  return Object.entries(combined)
    .map(([element, count]) => ({ element, count }))
    .sort((a, b) => a.element.localeCompare(b.element));
}