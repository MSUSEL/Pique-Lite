import type { useChartZoom } from "../../hooks/useChartZoom";

export type ChartMode = "brush" | "tooltip";

export interface LineConfig<T> {
  dataKey: keyof T;
  stroke?: string;
  name?: string;
}

export interface PlotAreaProps<T extends Record<string, unknown>> {
  data: T[];
  lines: LineConfig<T>[];
  height?: number;
  xAxisKey?: keyof T;
  width?: number;
  margin?: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
}

export interface BrushSelection<T> {
  start: T;
  end: T;
  data: T[];
}

export interface LinePlotContextType<T> {
  mode: ChartMode;
  setMode: (mode: ChartMode) => void;
  zoomState: ReturnType<typeof useChartZoom<T>>["zoomState"];
  zoomHandlers: ReturnType<typeof useChartZoom<T>>["zoomHandlers"];
  currentSelection: BrushSelection<T> | null;
}
