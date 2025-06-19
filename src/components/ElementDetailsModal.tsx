import React from 'react';
import { X, Atom, Zap, Thermometer, Calendar, User, Lightbulb, Wrench } from 'lucide-react';
import { ElementDetails } from '../data/elementDetails';

interface ElementDetailsModalProps {
  element: ElementDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ElementDetailsModal({ element, isOpen, onClose }: ElementDetailsModalProps) {
  if (!isOpen || !element) return null;

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'alkali metal':
        return 'bg-red-500';
      case 'alkaline earth metal':
        return 'bg-orange-500';
      case 'transition metal':
        return 'bg-yellow-500';
      case 'post-transition metal':
        return 'bg-green-500';
      case 'metalloid':
        return 'bg-teal-500';
      case 'nonmetal':
        return 'bg-blue-500';
      case 'halogen':
        return 'bg-indigo-500';
      case 'noble gas':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <div className="text-center">
                  <div className="text-xs opacity-80">{element.atomicNumber}</div>
                  <div className="text-2xl font-bold">{element.symbol}</div>
                  <div className="text-xs opacity-80">{element.atomicMass}</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{element.name}</h1>
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(element.category)} text-white`}>
                  {element.category}
                </div>
                <div className="text-blue-100">
                  Block: {element.block.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {element.description}
            </p>
          </div>

          {/* Basic Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Atom className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Atomic Properties</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Atomic Number:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{element.atomicNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Atomic Mass:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{element.atomicMass} g/mol</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Group:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{element.group}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Period:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{element.period}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Electronic Properties</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Configuration:</span>
                  <span className="font-mono text-xs font-medium text-gray-800 dark:text-gray-200">{element.electronConfiguration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Oxidation States:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{element.oxidationStates}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Thermometer className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Physical Properties</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">State:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{element.physicalState}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Melting Point:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{element.meltingPoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Boiling Point:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{element.boilingPoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Density:</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{element.density}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Discovery Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6">
            <div className="flex items-center mb-3">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mr-2" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Discovery</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Discovered by</div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">{element.discoveredBy}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400 mr-2" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Year</div>
                  <div className="font-medium text-gray-800 dark:text-gray-200">{element.discoveryYear}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Uses */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Wrench className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Common Uses</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {element.uses.map((use, index) => (
                <div key={index} className="flex items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">{use}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Fact */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Fun Fact</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic">
              {element.funFact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}