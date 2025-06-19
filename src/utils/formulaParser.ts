import { atomicMasses } from '../data/atomicMasses';

export interface ElementCount {
  element: string;
  count: number;
}

export interface ParseResult {
  elements: ElementCount[];
  isValid: boolean;
  error?: string;
  errorPosition?: number;
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
    const invalidCharMatch = cleanFormula.match(/[^A-Za-z0-9()]/);
    const errorPosition = invalidCharMatch ? cleanFormula.indexOf(invalidCharMatch[0]) : 0;
    return {
      elements: [],
      isValid: false,
      error: `Invalid character '${invalidCharMatch?.[0]}' at position ${errorPosition + 1}`,
      errorPosition
    };
  }

  // Check that formula starts with uppercase letter
  if (!/^[A-Z]/.test(cleanFormula)) {
    return {
      elements: [],
      isValid: false,
      error: 'Formula must start with an element symbol (uppercase letter)',
      errorPosition: 0
    };
  }

  try {
    const elements = parseRecursive(cleanFormula);
    
    // Validate that all elements exist in our atomic masses database
    for (const { element } of elements) {
      if (!atomicMasses[element]) {
        const elementPosition = cleanFormula.indexOf(element);
        return {
          elements: [],
          isValid: false,
          error: `Unknown element: ${element}`,
          errorPosition: elementPosition
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
    const errorMessage = error instanceof Error ? error.message : 'Invalid formula format';
    const positionMatch = errorMessage.match(/position (\d+)/);
    const errorPosition = positionMatch ? parseInt(positionMatch[1]) - 1 : undefined;
    
    return {
      elements: [],
      isValid: false,
      error: errorMessage,
      errorPosition
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
        throw new Error(`Unmatched opening parenthesis at position ${i + 1}`);
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
      throw new Error(`Unexpected character '${formula[i]}' at position ${i + 1}`);
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