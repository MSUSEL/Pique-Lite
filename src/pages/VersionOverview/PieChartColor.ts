import { getAllRiskLevels } from "../../composites/RiskHelpers";
import { useColorMode } from "@/composites/ColorMode";

// Legacy export for backwards compatibility (not color-mode aware)
export const COLORS: Record<string, string> = Object.fromEntries(
  getAllRiskLevels().map((level) => [level.name, level.color])
);

// Hook to get color-mode aware risk colors for pie charts
export function usePieChartColors(): Record<string, string> {
  const { getRiskColor } = useColorMode();
  const levels = getAllRiskLevels();

  const colors: Record<string, string> = {};
  levels.forEach((level) => {
    // Use the risk level name directly to get the fixed color
    const riskLevelKey = level.name.toLowerCase() as 'severe' | 'high' | 'elevated' | 'guarded' | 'low';
    colors[level.name] = getRiskColor(riskLevelKey, "background");
  });

  return colors;
}
