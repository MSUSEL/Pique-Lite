import { atom } from "jotai";
import * as schema from "../visualizer-schema";

export function createVisualizerState() {
  const dataset = atom<schema.base.Schema | undefined>(undefined);
  const sortingState = atom<"no-sort" | "value-asc" | "value-desc" | "weight-asc" | "weight-desc">("no-sort");
  const filteringState = atom<"no-filter" | "by-risk-level" | "by-range">("no-filter");
  const hideZeroWeightEdgeState = atom<"not-hidding" | "hidding">("not-hidding");
  const hideOneValueNodeState = atom<"not-hidding" | "hidding">("not-hidding");
  

  // when filteringState = by-risk-level, checkbox states
  const filteringByRiskLevelCheckboxStates = atom<Record<string, boolean>>({
    Insignificant: true,
    Low: true,
    Medium: true,
    High: true,
    Severe: true,
  });

  // State for managing minimum and maximum values for value and weight ranges
  const minValueState = atom<number>(-100);
  const maxValueState = atom<number>(1);
  const minWeightState = atom<number>(0);
  const maxWeightState = atom<number>(1);

  // State for importance adjustment
  const adjustedImportance = atom<Record<string, number>>({});

  // State for tqi update based on importance adjustment
  const tqiValue = atom<number | undefined>(undefined);

  return {
    dataset,
    sortingState,
    filteringState,
    filteringByRiskLevelCheckboxStates,
    hideZeroWeightEdgeState,
    hideOneValueNodeState,
    minValueState,
    maxValueState,
    minWeightState,
    maxWeightState,
    adjustedImportance,
    tqiValue,
  };
}

export const VisualizerState = createVisualizerState();