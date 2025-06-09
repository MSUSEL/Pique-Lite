import { getRisk, getAllRiskLevels } from "../../composites/RiskHelpers";

interface FilterableItem {
  value: number;
  weights: Record<string, number>;
  [key: string]: any;
}

// define a function classifyRiskLevels for a high-level object, such as tqi, quality_aspects, product_factors
// input: an object: NestedObject
// output: two arrays or a dictionary: risk level counts, and objects.names in each level
export function ClassifyNestedObjRiskLevel(
  obj: Record<string, FilterableItem>,
  isDiagnostics: boolean
): [number[], string[][]] {
  const levels = getAllRiskLevels();
  const riskCounts = Array(levels.length).fill(0);
  const riskSubObjNames: string[][] = levels.map(() => []);
  
  for (const key in obj) {
    const item = obj[key];
    const risk = getRisk(item.value, isDiagnostics ? "diagnostic" : "normal");
    const index = levels.findIndex((level) => level.name === risk.name);
  
    if (index != -1) {
      riskCounts[index]++;
      riskSubObjNames[index].push(item.name);
    } else {
      console.warn(`Risk level not found for item: ${item.name} (value: ${item.value})`)
    }
  }
  return [riskCounts, riskSubObjNames];
}
  