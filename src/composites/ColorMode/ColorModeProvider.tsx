import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorMode, getPalette, normalPalette, colorBlindPalette } from './colors';

interface ColorModeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
  setColorMode: (mode: ColorMode) => void;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

interface ColorModeProviderProps {
  children: React.ReactNode;
}

function setCSSCustomProperties(mode: ColorMode) {
  const palette = getPalette(mode);
  const root = document.documentElement;

  // Set background colors
  root.style.setProperty('--risk-severe-background', palette.background.severe);
  root.style.setProperty('--risk-high-background', palette.background.high);
  root.style.setProperty('--risk-elevated-background', palette.background.elevated);
  root.style.setProperty('--risk-guarded-background', palette.background.guarded);
  root.style.setProperty('--risk-low-background', palette.background.low);

  // Set font colors
  root.style.setProperty('--risk-severe-font', palette.font.severe);
  root.style.setProperty('--risk-high-font', palette.font.high);
  root.style.setProperty('--risk-elevated-font', palette.font.elevated);
  root.style.setProperty('--risk-guarded-font', palette.font.guarded);
  root.style.setProperty('--risk-low-font', palette.font.low);

  // Set badge colors
  root.style.setProperty('--risk-severe-badge', palette.badge.severe);
  root.style.setProperty('--risk-high-badge', palette.badge.high);
  root.style.setProperty('--risk-elevated-badge', palette.badge.elevated);
  root.style.setProperty('--risk-guarded-badge', palette.badge.guarded);
  root.style.setProperty('--risk-low-badge', palette.badge.low);

  // Legacy compatibility - maintain old CSS custom properties
  root.style.setProperty('--severe-color', palette.background.severe);
  root.style.setProperty('--high-color', palette.background.high);
  root.style.setProperty('--elevated-color', palette.background.elevated);
  root.style.setProperty('--guarded-color', palette.background.guarded);
  root.style.setProperty('--low-color', palette.background.low);
}

export function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    // Load from localStorage or default to 'normal'
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('colorMode');
      return (stored as ColorMode) || 'normal';
    }
    return 'normal';
  });

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('colorMode', mode);
    }
    setCSSCustomProperties(mode);
  };

  const toggleColorMode = () => {
    const newMode = colorMode === 'normal' ? 'colorblind' : 'normal';
    setColorMode(newMode);
  };

  // Set initial CSS custom properties
  useEffect(() => {
    setCSSCustomProperties(colorMode);
  }, [colorMode]);

  const value: ColorModeContextType = {
    colorMode,
    toggleColorMode,
    setColorMode,
  };

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorModeContext() {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error('useColorModeContext must be used within a ColorModeProvider');
  }
  return context;
}