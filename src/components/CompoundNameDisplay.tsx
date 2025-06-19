import React from 'react';
import { BookOpen, Beaker, Tag, Info } from 'lucide-react';
import { CompoundInfo } from '../data/compoundNames';

interface CompoundNameDisplayProps {
  compoundInfo: CompoundInfo | null;
  systematicName: string | null;
  formula: string;
}

export function CompoundNameDisplay({ compoundInfo, systematicName, formula }: CompoundNameDisplayProps) {
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
      </div>
      
      <div className="text-center mb-6">
        <div className="text-lg font-medium text-indigo-100 mb-2">Formula: {formula}</div>
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
              No common name in database
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
          <div className="text-2xl font-bold text-white mb-2">
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

      {/* Information Banner */}
      <div className="mt-6">
        {!compoundInfo && systematicName && (
          <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-200 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-100">
                <strong>Generated Name:</strong> This compound is not in our database of {Object.keys(require('../data/compoundNames').compoundDatabase).length}+ compounds. 
                The systematic name follows IUPAC nomenclature rules for binary and simple compounds.
              </div>
            </div>
          </div>
        )}

        {compoundInfo && (
          <div className="p-4 bg-green-500/20 rounded-lg border border-green-400/30">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-green-200 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-100">
                <strong>Database Match:</strong> This compound is found in our comprehensive database of common chemical compounds with verified names and classifications.
              </div>
            </div>
          </div>
        )}

        {!compoundInfo && !systematicName && (
          <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-400/30">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-orange-200 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-orange-100">
                <strong>Complex Compound:</strong> This compound requires specialized nomenclature rules beyond our current systematic naming capabilities. 
                Consider consulting chemical databases like PubChem or ChemSpider for detailed naming information.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}