import React, { createContext, useContext, useEffect, useState } from 'react';

export interface RiskLevelRange {
  normalRange: [number, number];
  diagnosticRange: [number, number];
}

export interface RiskLevelRanges {
  severe: RiskLevelRange;
  high: RiskLevelRange;
  elevated: RiskLevelRange;
  guarded: RiskLevelRange;
  low: RiskLevelRange;
}

const DEFAULT_RISK_LEVEL_RANGES: RiskLevelRanges = {
  severe: {
    normalRange: [-10, 0.2],
    diagnosticRange: [1.5, Infinity]
  },
  high: {
    normalRange: [0.2, 0.4],
    diagnosticRange: [0.8, 1.5]
  },
  elevated: {
    normalRange: [0.4, 0.6],
    diagnosticRange: [0.5, 0.8]
  },
  guarded: {
    normalRange: [0.6, 0.8],
    diagnosticRange: [0.2, 0.5]
  },
  low: {
    normalRange: [0.8, 1],
    diagnosticRange: [0, 0.2]
  }
};

interface RiskLevelSettingsContextType {
  riskLevelRanges: RiskLevelRanges;
  updateRiskLevelRange: (level: keyof RiskLevelRanges, range: RiskLevelRange) => void;
  updateMultipleRiskLevelRanges: (updates: Partial<RiskLevelRanges>) => void;
  resetToDefaults: () => void;
  isCustomized: boolean;
}

const RiskLevelSettingsContext = createContext<RiskLevelSettingsContextType | undefined>(undefined);

interface RiskLevelSettingsProviderProps {
  children: React.ReactNode;
}

export function RiskLevelSettingsProvider({ children }: RiskLevelSettingsProviderProps) {
  const [riskLevelRanges, setRiskLevelRanges] = useState<RiskLevelRanges>(() => {
    // Load from localStorage or default
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('riskLevelRanges');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Convert Infinity values that were serialized as null
          Object.keys(parsed).forEach((level) => {
            const levelKey = level as keyof RiskLevelRanges;
            if (parsed[levelKey].normalRange[0] === null) {
              parsed[levelKey].normalRange[0] = -Infinity;
            }
            if (parsed[levelKey].normalRange[1] === null) {
              parsed[levelKey].normalRange[1] = Infinity;
            }
            if (parsed[levelKey].diagnosticRange[0] === null) {
              parsed[levelKey].diagnosticRange[0] = -Infinity;
            }
            if (parsed[levelKey].diagnosticRange[1] === null) {
              parsed[levelKey].diagnosticRange[1] = Infinity;
            }
          });
          return parsed;
        } catch (e) {
          console.error('Failed to parse stored risk level ranges:', e);
        }
      }
    }
    return DEFAULT_RISK_LEVEL_RANGES;
  });

  const [isCustomized, setIsCustomized] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('riskLevelRanges') !== null;
    }
    return false;
  });

  const updateRiskLevelRange = (level: keyof RiskLevelRanges, range: RiskLevelRange) => {
    setRiskLevelRanges((prev) => {
      const updated = {
        ...prev,
        [level]: range
      };

      // Save to localStorage
      if (typeof window !== 'undefined') {
        // Convert Infinity values to null for JSON serialization
        const serializable = JSON.parse(JSON.stringify(updated, (key, value) => {
          if (value === Infinity) return null;
          if (value === -Infinity) return null;
          return value;
        }));
        localStorage.setItem('riskLevelRanges', JSON.stringify(serializable));
      }

      setIsCustomized(true);
      return updated;
    });
  };

  const updateMultipleRiskLevelRanges = (updates: Partial<RiskLevelRanges>) => {
    setRiskLevelRanges((prev) => {
      const updated = {
        ...prev,
        ...updates
      };

      // Save to localStorage
      if (typeof window !== 'undefined') {
        // Convert Infinity values to null for JSON serialization
        const serializable = JSON.parse(JSON.stringify(updated, (key, value) => {
          if (value === Infinity) return null;
          if (value === -Infinity) return null;
          return value;
        }));
        localStorage.setItem('riskLevelRanges', JSON.stringify(serializable));
      }

      setIsCustomized(true);
      return updated;
    });
  };

  const resetToDefaults = () => {
    setRiskLevelRanges(DEFAULT_RISK_LEVEL_RANGES);
    setIsCustomized(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('riskLevelRanges');
    }
  };

  const value: RiskLevelSettingsContextType = {
    riskLevelRanges,
    updateRiskLevelRange,
    updateMultipleRiskLevelRanges,
    resetToDefaults,
    isCustomized
  };

  return (
    <RiskLevelSettingsContext.Provider value={value}>
      {children}
    </RiskLevelSettingsContext.Provider>
  );
}

export function useRiskLevelSettings() {
  const context = useContext(RiskLevelSettingsContext);
  if (context === undefined) {
    throw new Error('useRiskLevelSettings must be used within a RiskLevelSettingsProvider');
  }
  return context;
}

export { DEFAULT_RISK_LEVEL_RANGES };
