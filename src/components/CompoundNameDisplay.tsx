import React from 'react';
import { BookOpen, Beaker, Tag } from 'lucide-react';
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

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-2xl p-6 mb-8 text-white shadow-2xl">
      <div className="flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 mr-3" />
        <h2 className="text-2xl font-bold">Compound Names</h2>
      </div>
      
      <div className="text-center mb-4">
        <div className="text-lg font-medium text-indigo-100 mb-2">Formula: {formula}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Name */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center mb-2">
            <Tag className="w-5 h-5 mr-2 text-yellow-300" />
            <h3 className="text-lg font-semibold text-yellow-300">Common Name</h3>
          </div>
          <div className="text-2xl font-bold text-white">
            {compoundInfo?.commonName || 'Not available'}
          </div>
          {compoundInfo?.category && (
            <div className="text-sm text-indigo-200 mt-1">
              Category: {compoundInfo.category}
            </div>
          )}
        </div>

        {/* IUPAC Name */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center mb-2">
            <Beaker className="w-5 h-5 mr-2 text-green-300" />
            <h3 className="text-lg font-semibold text-green-300">IUPAC Name</h3>
          </div>
          <div className="text-2xl font-bold text-white">
            {compoundInfo?.iupacName || systematicName || 'Not available'}
          </div>
          <div className="text-sm text-indigo-200 mt-1">
            {compoundInfo ? 'Official IUPAC nomenclature' : 'Systematic nomenclature'}
          </div>
        </div>
      </div>

      {!compoundInfo && systematicName && (
        <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
          <div className="text-sm text-yellow-100">
            <strong>Note:</strong> This compound is not in our database. The systematic name is generated based on IUPAC nomenclature rules for binary compounds.
          </div>
        </div>
      )}

      {!compoundInfo && !systematicName && (
        <div className="mt-4 p-3 bg-orange-500/20 rounded-lg border border-orange-400/30">
          <div className="text-sm text-orange-100">
            <strong>Note:</strong> Naming information is not available for this compound. This may be a complex compound requiring specialized nomenclature rules.
          </div>
        </div>
      )}
    </div>
  );
}