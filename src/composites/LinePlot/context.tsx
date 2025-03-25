import { createContext, useContext } from "react";
import type { useChartZoom } from "./hooks/use-chart-zoom";

// Types
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

// Context
export const LinePlotContext = createContext<LinePlotContextType<any> | null>(
  null
);

// Hook
export function useLinePlotContext<T>() {
  const context = useContext(LinePlotContext);
  if (!context) {
    throw new Error(
      "LinePlot components must be used within a LinePlot.Container"
    );
  }
  return context as LinePlotContextType<T>;
}
