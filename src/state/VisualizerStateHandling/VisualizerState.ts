export interface VisualizerState {
    sortingState: "no-sort" | "value-asc" | "value-desc" | "weight-asc" | "weight-desc";
    filteringState: "no-filter" | "by-risk-level" | "by-range";
    hideZeroWeightEdgeState: "not-hiding" | "hiding";
    hideOneValueNodeState: "not-hiding" | "hiding";
    filteringByRiskLevelCheckboxStates: Record<string, boolean>;
    minValueState: number;
    maxValueState: number;
    minWeightState: number;
    maxWeightState: number;
    adjustedImportance: Record<string, number>;
    tqiValue: number | undefined;
  }
  