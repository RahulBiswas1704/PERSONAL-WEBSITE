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
  { id: 'modern' as StructuralTheme, label: 'Vanilla Extract (Default)', icon: '✨' },
  { id: 'minimal' as StructuralTheme, label: 'TL;DR (Bare Minimum)', icon: '📝' },
  { id: 'retro' as StructuralTheme, label: '90s Webmaster', icon: '🕹️' },
  { id: 'brutal' as StructuralTheme, label: 'Architect\'s Fever Dream', icon: '🏗️', locked: true },
  { id: 'pixel' as StructuralTheme, label: 'Edgy Design Studio', icon: '📓', locked: true },
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

  const getGlobalStyles = () => {
    switch (theme) {
      case 'brutal':
        return `
          body {
            background-color: #f4f4f0 !important;
            background-image: 
              linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px) !important;
            background-size: 24px 24px !important;
            color: black !important;
          }
        `;
      case 'retro':
        return `
          body { background-color: #f4ebd0 !important; }
          .dark body { background-color: #000000 !important; }
        `;
      case 'pixel':
        return `
          body { background-color: #F0F0F0 !important; }
          .dark body { background-color: #111111 !important; }
        `;
      default:
        return '';
    }
  };

  return (
    <StructuralThemeContext.Provider value={{ theme, setTheme: handleSetTheme, availableThemes }}>
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: getGlobalStyles() }} />
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
