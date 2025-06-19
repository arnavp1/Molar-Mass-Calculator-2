import { useState, useEffect } from 'react';

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
  gradient: string;
}

const defaultSettings: ThemeSettings = {
  mode: 'system',
  gradient: 'from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900'
};

export function useThemeSettings() {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('themeSettings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (error) {
        console.error('Failed to parse theme settings:', error);
      }
    }
    return defaultSettings;
  });

  const [isDark, setIsDark] = useState(() => {
    if (settings.mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return settings.mode === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(settings));
    
    // Update dark mode based on settings
    if (settings.mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setIsDark(settings.mode === 'dark');
    }
  }, [settings]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const updateSettings = (newSettings: ThemeSettings) => {
    setSettings(newSettings);
  };

  return {
    settings,
    isDark,
    updateSettings
  };
}