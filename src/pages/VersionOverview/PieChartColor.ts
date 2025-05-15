import { getAllRiskLevels } from "../../composites/RiskHelpers";

export const COLORS: Record<string, string> = Object.fromEntries(
  getAllRiskLevels().map((level) => [level.name, level.color])
);
