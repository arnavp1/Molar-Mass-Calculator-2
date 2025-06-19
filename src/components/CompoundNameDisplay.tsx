import React from 'react';
import { BookOpen, Beaker, Tag, Info, ExternalLink, Database } from 'lucide-react';
import { ExternalCompoundInfo } from '../services/compoundLookup';

interface CompoundNameDisplayProps {
  compoundInfo: ExternalCompoundInfo | null;
  systematicName: string | null;
  formula: string;
  isLoading?: boolean;
}

export function CompoundNameDisplay({ 
  compoundInfo, 
  systematicName, 
  formula, 
  isLoading = false 
}: CompoundNameDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-6 mb-8 text-white shadow-2xl">
        <div className="flex items-center justify-center mb-4">
          <Database className="w-8 h-8 mr-3 animate-pulse" />
          <h2 className="text-2xl font-bold">Looking up compound names...</h2>
        </div>
        <div className="text-center">
          <div className="text-lg font-medium text-indigo-100 mb-2">Formula: {formula}</div>
          <div className="animate-pulse bg-white/20 rounded-lg h-20 mb-4"></div>
          <div className="text-sm text-indigo-200">
            Searching PubChem database for compound information...
          </div>
        </div>
      </div>
    );
  }

  if (!compoundInfo && !systematicName) {
    return null;
  }

  const hasCommonName = compoundInfo?.commonName;
  const hasIupacName = compoundInfo?.iupacName || systematicName;

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-6 mb-8 text-white shadow-2xl">
      <div className="flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 mr-3" />
        <h2 className="text-2xl font-bold">Compound Names</h2>
        {compoundInfo && (
          <div className="ml-3 flex items-center text-sm bg-white/20 px-2 py-1 rounded-full">
            <Database className="w-4 h-4 mr-1" />
            PubChem
          </div>
        )}
      </div>
      
      <div className="text-center mb-6">
        <div className="text-lg font-medium text-indigo-100 mb-2">Formula: {formula}</div>
        {compoundInfo?.molecularWeight && (
          <div className="text-sm text-indigo-200">
            Database Molecular Weight: {compoundInfo.molecularWeight.toFixed(2)} g/mol
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Name */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center mb-3">
            <Tag className="w-5 h-5 mr-2 text-yellow-300" />
            <h3 className="text-lg font-semibold text-yellow-300">Common Name</h3>
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            {hasCommonName || 'Not available'}
          </div>
          {compoundInfo?.category && (
            <div className="text-sm text-indigo-200">
              Category: {compoundInfo.category}
            </div>
          )}
          {!hasCommonName && (
            <div className="text-sm text-yellow-200 italic">
              No common name found in database
            </div>
          )}
        </div>

        {/* IUPAC/Systematic Name */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center mb-3">
            <Beaker className="w-5 h-5 mr-2 text-green-300" />
            <h3 className="text-lg font-semibold text-green-300">
              {compoundInfo?.iupacName ? 'IUPAC Name' : 'Systematic Name'}
            </h3>
          </div>
          <div className="text-2xl font-bold text-white mb-2 break-words">
            {hasIupacName || 'Not available'}
          </div>
          <div className="text-sm text-indigo-200">
            {compoundInfo?.iupacName 
              ? 'Official IUPAC nomenclature' 
              : systematicName 
                ? 'Generated systematic name'
                : 'Complex compound naming'
            }
          </div>
        </div>
      </div>

      {/* Additional Synonyms */}
      {compoundInfo?.synonyms && compoundInfo.synonyms.length > 1 && (
        <div className="mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <h4 className="text-lg font-semibold text-blue-300 mb-3">Other Names</h4>
            <div className="flex flex-wrap gap-2">
              {compoundInfo.synonyms.slice(1, 6).map((synonym, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/30 rounded-full text-sm text-blue-100"
                >
                  {synonym}
                </span>
              ))}
              {compoundInfo.synonyms.length > 6 && (
                <span className="px-3 py-1 bg-gray-500/30 rounded-full text-sm text-gray-200">
                  +{compoundInfo.synonyms.length - 6} more
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Information Banner */}
      <div className="mt-6">
        {compoundInfo && (
          <div className="p-4 bg-green-500/20 rounded-lg border border-green-400/30">
            <div className="flex items-start">
              <Database className="w-5 h-5 text-green-200 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-100">
                <strong>Database Match:</strong> This compound was found in the PubChem database, 
                a comprehensive repository of chemical information maintained by NCBI. 
                <a 
                  href={`https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(formula)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center ml-2 text-green-200 hover:text-green-100 underline"
                >
                  View on PubChem <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        )}

        {!compoundInfo && systematicName && (
          <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-200 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-100">
                <strong>Generated Name:</strong> This compound was not found in the PubChem database. 
                The systematic name follows IUPAC nomenclature rules for binary and simple compounds.
              </div>
            </div>
          </div>
        )}

        {!compoundInfo && !systematicName && (
          <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-400/30">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-orange-200 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-orange-100">
                <strong>Complex Compound:</strong> This compound was not found in the PubChem database 
                and requires specialized nomenclature rules beyond our current systematic naming capabilities. 
                Consider searching directly on{' '}
                <a 
                  href={`https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(formula)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-200 hover:text-orange-100 underline"
                >
                  PubChem
                </a>{' '}
                or{' '}
                <a 
                  href={`https://www.chemspider.com/Search.aspx?q=${encodeURIComponent(formula)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-200 hover:text-orange-100 underline"
                >
                  ChemSpider
                </a>.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}