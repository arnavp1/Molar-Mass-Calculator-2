import React from 'react';
import { BookOpen, Beaker, Tag, Loader2, ExternalLink, AlertCircle, Info } from 'lucide-react';
import { PubChemCompoundInfo } from '../services/pubchemService';

interface CompoundNameDisplayProps {
  compoundInfo: PubChemCompoundInfo | null;
  formula: string;
  isLoading: boolean;
  error?: string;
}

export function CompoundNameDisplay({ compoundInfo, formula, isLoading, error }: CompoundNameDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-6 mb-8 text-white shadow-2xl">
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 mr-3 animate-spin" />
          <span className="text-lg">Looking up compound names from PubChem...</span>
        </div>
        <div className="text-center mt-2 text-indigo-200 text-sm">
          Searching molecular formula database - this may take a few seconds
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 rounded-2xl p-6 mb-8 text-white shadow-2xl">
        <div className="flex items-center justify-center mb-2">
          <AlertCircle className="w-6 h-6 mr-3" />
          <h2 className="text-xl font-bold">Compound Names</h2>
        </div>
        <div className="text-center">
          <div className="text-red-100 mb-2">Formula: {formula}</div>
          <div className="text-red-200">{error}</div>
          <div className="text-red-300 text-sm mt-2">
            This could be due to network issues or the compound not being in PubChem's database
          </div>
        </div>
      </div>
    );
  }

  if (!compoundInfo || (!compoundInfo.commonName && !compoundInfo.iupacName && (!compoundInfo.synonyms || compoundInfo.synonyms.length === 0))) {
    return (
      <div className="bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 rounded-2xl p-6 mb-8 text-white shadow-2xl">
        <div className="flex items-center justify-center mb-4">
          <Info className="w-8 h-8 mr-3" />
          <h2 className="text-2xl font-bold">Compound Names</h2>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-lg font-medium text-gray-100 mb-2">Formula: {formula}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
          <div className="text-gray-200">
            No naming information found in PubChem database for this compound.
          </div>
          <div className="text-sm text-gray-300 mt-2">
            This may be a theoretical compound, a mixture, or one not yet catalogued in PubChem.
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Try common compounds like H2O, C6H12O6, CH4, or NaCl
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-6 mb-8 text-white shadow-2xl">
      <div className="flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 mr-3" />
        <h2 className="text-2xl font-bold">Compound Names</h2>
      </div>
      
      <div className="text-center mb-4">
        <div className="text-lg font-medium text-indigo-100 mb-2">Formula: {formula}</div>
        {compoundInfo.cid && (
          <div className="text-sm text-indigo-200">
            PubChem CID: {compoundInfo.cid}
            <a 
              href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compoundInfo.cid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center text-yellow-300 hover:text-yellow-200 transition-colors"
            >
              View on PubChem <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Name */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center mb-2">
            <Tag className="w-5 h-5 mr-2 text-yellow-300" />
            <h3 className="text-lg font-semibold text-yellow-300">Common Name</h3>
          </div>
          <div className="text-2xl font-bold text-white">
            {compoundInfo.commonName || 'Not available'}
          </div>
          <div className="text-sm text-indigo-200 mt-1">
            Most commonly used name
          </div>
        </div>

        {/* IUPAC Name */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center mb-2">
            <Beaker className="w-5 h-5 mr-2 text-green-300" />
            <h3 className="text-lg font-semibold text-green-300">IUPAC Name</h3>
          </div>
          <div className="text-2xl font-bold text-white break-words">
            {compoundInfo.iupacName || 'Not available'}
          </div>
          <div className="text-sm text-indigo-200 mt-1">
            Official systematic name
          </div>
        </div>
      </div>

      {/* Additional Synonyms */}
      {compoundInfo.synonyms && compoundInfo.synonyms.length > 2 && (
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">Other Names</h3>
          <div className="flex flex-wrap gap-2">
            {compoundInfo.synonyms.slice(0, 8).map((synonym, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-white/20 rounded-full text-sm text-white"
              >
                {synonym}
              </span>
            ))}
            {compoundInfo.synonyms.length > 8 && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-indigo-200">
                +{compoundInfo.synonyms.length - 8} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
        <div className="text-sm text-blue-100">
          <strong>Data Source:</strong> Names and information retrieved from the PubChem database maintained by the National Center for Biotechnology Information (NCBI).
        </div>
      </div>
    </div>
  );
}