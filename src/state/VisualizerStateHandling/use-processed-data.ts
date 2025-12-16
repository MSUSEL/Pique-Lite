import { useMemo } from "react";
import { VisualizerState } from "./VisualizerState";
import { sort } from "./Sorting";
import { filterByRiskLevels } from "./FilterByRiskLevel";
import { filterByWeightRange } from "./FilterByWeightRange";
import { filterByValueRange } from "./FilterByValueRange";
import { hideZeroWeightEdges } from "./HideZeroWeightEdges";

import * as schema from "../visualizerSchema";

interface ProcessedDataParams extends VisualizerState {
  dataset: schema.base.Schema;
}

export const useProcessedData = (params: ProcessedDataParams) => {
  return useMemo(() => {
    if (!params.dataset) return null;

    if (params.dataset.factors.tqi && params.adjustedImportance) {
      const firstTqiKey = Object.keys(params.dataset.factors.tqi)[0];
      if (firstTqiKey && params.dataset.factors.tqi[firstTqiKey]) {
        params.dataset.factors.tqi[firstTqiKey].weights =
          params.adjustedImportance;
        if (params.tqiValue) {
          params.dataset.factors.tqi[firstTqiKey].value = params.tqiValue;
        }
      }
    }

    let data = sort(params.sortingState, params.dataset);
    const isEdgeHiding = params.hideZeroWeightEdgeState === "hiding";

    data = hideZeroWeightEdges(data, isEdgeHiding);
    data = filterByRiskLevels(data, params.filteringByRiskLevelCheckboxStates);
    data = filterByValueRange(data, params.minValueState, params.maxValueState);
    data = filterByWeightRange(
      data,
      params.minWeightState,
      params.maxWeightState
    );

    return data;
  }, [
    params.dataset,
    params.adjustedImportance,
    params.tqiValue,
    params.sortingState,
    params.filteringState,
    params.filteringByRiskLevelCheckboxStates,
    params.hideZeroWeightEdgeState,
    params.minValueState,
    params.maxValueState,
    params.minWeightState,
    params.maxWeightState
  ]);
};

export type ProcessedVisualizerDataType = ReturnType<typeof useProcessedData>;

