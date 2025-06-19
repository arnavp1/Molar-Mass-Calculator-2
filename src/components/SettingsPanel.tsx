import React, { useState } from 'react';
import { Settings, X, Palette, Monitor, Sun, Moon } from 'lucide-react';

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
  gradient: string;
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ThemeSettings;
  onSettingsChange: (settings: ThemeSettings) => void;
}

const gradientOptions = [
  {
    name: 'Ocean Blue',
    value: 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900',
    preview: 'bg-gradient-to-br from-blue-400 to-purple-500'
  },
  {
    name: 'Forest Green',
    value: 'from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900 dark:to-teal-900',
    preview: 'bg-gradient-to-br from-green-400 to-teal-500'
  },
  {
    name: 'Sunset Orange',
    value: 'from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-orange-900 dark:to-red-900',
    preview: 'bg-gradient-to-br from-orange-400 to-red-500'
  },
  {
    name: 'Purple Dream',
    value: 'from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900',
    preview: 'bg-gradient-to-br from-purple-400 to-pink-500'
  },
  {
    name: 'Cosmic Dark',
    value: 'from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900',
    preview: 'bg-gradient-to-br from-slate-400 to-zinc-500'
  },
  {
    name: 'Golden Hour',
    value: 'from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-yellow-900 dark:to-orange-900',
    preview: 'bg-gradient-to-br from-yellow-400 to-orange-500'
  },
  {
    name: 'Arctic Ice',
    value: 'from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-cyan-900 dark:to-blue-900',
    preview: 'bg-gradient-to-br from-cyan-400 to-blue-500'
  },
  {
    name: 'Cherry Blossom',
    value: 'from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-pink-900 dark:to-rose-900',
    preview: 'bg-gradient-to-br from-pink-400 to-rose-500'
  }
];

export function SettingsPanel({ isOpen, onClose, settings, onSettingsChange }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<'theme' | 'colors'>('theme');

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleThemeModeChange = (mode: 'light' | 'dark' | 'system') => {
    onSettingsChange({ ...settings, mode });
  };

  const handleGradientChange = (gradient: string) => {
    onSettingsChange({ ...settings, gradient });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Settings className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'theme'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Monitor className="w-4 h-4 inline mr-2" />
            Theme Mode
          </button>
          <button
            onClick={() => setActiveTab('colors')}
            className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'colors'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Palette className="w-4 h-4 inline mr-2" />
            Background Gradients
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Theme Mode
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleThemeModeChange('light')}
                    className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                      settings.mode === 'light'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <Sun className="w-5 h-5 text-yellow-500 mr-3" />
                    <div className="text-left">
                      <div className="font-medium text-gray-800 dark:text-gray-200">Light Mode</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Clean and bright interface
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleThemeModeChange('dark')}
                    className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                      settings.mode === 'dark'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <Moon className="w-5 h-5 text-blue-400 mr-3" />
                    <div className="text-left">
                      <div className="font-medium text-gray-800 dark:text-gray-200">Dark Mode</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Easy on the eyes in low light
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleThemeModeChange('system')}
                    className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                      settings.mode === 'system'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <Monitor className="w-5 h-5 text-gray-500 mr-3" />
                    <div className="text-left">
                      <div className="font-medium text-gray-800 dark:text-gray-200">System</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Follow your device settings
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-6">
              {/* Background Gradients */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Background Gradient
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {gradientOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => handleGradientChange(option.value)}
                      className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                        settings.gradient === option.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg ${option.preview} mr-3 shadow-sm`}></div>
                      <div className="text-left">
                        <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                          {option.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Preview
                </h3>
                <div className={`p-6 rounded-lg bg-gradient-to-br ${settings.gradient} border border-gray-200 dark:border-gray-600`}>
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">Sample Element</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Preview of your theme</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm inline-block">
                      Sample Badge
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}