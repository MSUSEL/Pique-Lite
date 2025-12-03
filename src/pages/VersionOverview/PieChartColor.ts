import { getAllRiskLevels, useRiskColor } from "../../composites/RiskHelpers";

// Legacy export for backwards compatibility (not color-mode aware)
export const COLORS: Record<string, string> = Object.fromEntries(
  getAllRiskLevels().map((level) => [level.name, level.color])
);

// Hook to get color-mode aware risk colors for pie charts
export function usePieChartColors(): Record<string, string> {
  const { getRiskColor } = useRiskColor();
  const levels = getAllRiskLevels();

  const colors: Record<string, string> = {};
  levels.forEach((level) => {
    // Use a sample value from each risk level range to get the correct color
    const sampleValue = level.normalRange[0] + 0.01;
    colors[level.name] = getRiskColor(sampleValue, "background", "normal");
  });

  return colors;
}
