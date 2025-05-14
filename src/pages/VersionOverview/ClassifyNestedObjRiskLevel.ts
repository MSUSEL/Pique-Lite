interface FilterableItem {
  value: number;
  weights: Record<string, number>;
  [key: string]: any;
}

// define a function classifyRiskLevels for a high-level object, such as tqi, quality_aspects, product_factors
// input: an object: NestedObject
// ouput: two arrays or a dictionary: risk level counts, and objects.names in each level
export function ClassifyNestedObjRiskLevel(
    obj: Record<string, FilterableItem>,
    isDiagnostics: boolean
  ): [number[], string[][]] {
    const riskCounts = [0, 0, 0, 0, 0];
    const riskSubObjNames: string[][] = [[], [], [], [], []];
  
    for (const key in obj) {
      const item = obj[key];
      let index;
  
      if (isDiagnostics) {
        if (item.value < 0.2) index = 4;
        else if (item.value <= 0.5) index = 3;
        else if (item.value <= 0.8) index = 2;
        else if (item.value <= 1.5) index = 1;
        else index = 0;
      } else {
        if (item.value <= 0.2) index = 0;
        else if (item.value <= 0.4) index = 1;
        else if (item.value <= 0.6) index = 2;
        else if (item.value <= 0.8) index = 3;
        else index = 4;
      }
  
      riskCounts[index]++;
      riskSubObjNames[index].push(item.name);
    }
    return [riskCounts, riskSubObjNames];
  }
  