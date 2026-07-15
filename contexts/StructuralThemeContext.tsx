"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type StructuralTheme = 'modern' | 'minimal' | 'retro' | 'brutal' | 'pixel';

interface StructuralThemeContextType {
  theme: StructuralTheme;
  setTheme: (theme: StructuralTheme) => void;
  availableThemes: { id: StructuralTheme; label: string; icon: string; locked?: boolean }[];
}

const StructuralThemeContext = createContext<StructuralThemeContextType | undefined>(undefined);

export const availableThemes = [
  { id: 'modern' as StructuralTheme, label: 'Modern (Default)', icon: '✨' },
  { id: 'minimal' as StructuralTheme, label: 'Minimal', icon: '📝' },
  { id: 'retro' as StructuralTheme, label: 'Retro', icon: '🕹️', locked: true },
  { id: 'brutal' as StructuralTheme, label: 'Neo-Brutalism', icon: '🏗️', locked: true },
  { id: 'pixel' as StructuralTheme, label: 'Pixel Art / RPG', icon: '👾', locked: true },
];

export function StructuralThemeProvider({ 
  children, 
  initialTheme = 'modern' 
}: { 
  children: React.ReactNode, 
  initialTheme?: StructuralTheme 
}) {
  const [theme, setTheme] = useState<StructuralTheme>(initialTheme);

  // We can still use useEffect for backwards compatibility if no cookie exists,
  // but if initialTheme is valid, it prevents the flash.
  useEffect(() => {
    if (!initialTheme || initialTheme === 'modern') {
      const savedTheme = localStorage.getItem('structural-theme') as StructuralTheme;
      if (savedTheme && savedTheme !== initialTheme && availableThemes.find(t => t.id === savedTheme)) {
        setTheme(savedTheme);
        document.cookie = `structural-theme=${savedTheme}; path=/; max-age=31536000`;
      }
    }
  }, [initialTheme]);

  const handleSetTheme = (newTheme: StructuralTheme) => {
    setTheme(newTheme);
    localStorage.setItem('structural-theme', newTheme);
    document.cookie = `structural-theme=${newTheme}; path=/; max-age=31536000`;
  };

  return (
    <StructuralThemeContext.Provider value={{ theme, setTheme: handleSetTheme, availableThemes }}>
      {children}
    </StructuralThemeContext.Provider>
  );
}

export function useStructuralTheme() {
  const context = useContext(StructuralThemeContext);
  if (context === undefined) {
    throw new Error('useStructuralTheme must be used within a StructuralThemeProvider');
  }
  return context;
}
