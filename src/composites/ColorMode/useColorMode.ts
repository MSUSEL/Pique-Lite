import { useColorModeContext } from './ColorModeProvider';
import { getPalette, ColorMode } from './colors';

export function useColorMode() {
  const context = useColorModeContext();
  
  const getCurrentPalette = () => getPalette(context.colorMode);
  
  const getRiskColor = (
    riskLevel: 'severe' | 'high' | 'elevated' | 'guarded' | 'low',
    type: 'background' | 'font' | 'badge' = 'background'
  ) => {
    const palette = getCurrentPalette();
    return palette[type][riskLevel];
  };

  return {
    ...context,
    getCurrentPalette,
    getRiskColor,
  };
}