import React, { useState } from "react";
import { useChartZoom } from "../../hooks/useChartZoom";
import {
  LinePlotContext,
  type ChartMode,
  type BrushSelection,
} from "./context";

interface ContainerProps<T> {
  children: React.ReactNode;
  data: T[];
  xAxisKey: keyof T;
  onZoom?: (selection: { start: T; end: T }) => void;
  style?: React.CSSProperties;
}

export function Container<T>({
  children,
  data,
  xAxisKey,
  onZoom,
}: ContainerProps<T>) {
  const [mode, setMode] = useState<ChartMode>("brush");
  const [currentSelection, setCurrentSelection] =
    useState<BrushSelection<T> | null>(null);

  const zoomHook = useChartZoom({
    enabled: mode === "brush",
    initialData: data,
    xAxisKey,
    onZoom: (selection) => {
      setCurrentSelection({
        ...selection,
        data: zoomHook.zoomState.data,
      });
      onZoom?.(selection);
    },
    onZoomOut: () => {
      setCurrentSelection(null);
    },
  });

  return (
    <LinePlotContext.Provider
      value={{
        mode,
        setMode,
        zoomState: zoomHook.zoomState,
        zoomHandlers: zoomHook.zoomHandlers,
        currentSelection,
      }}
    >
      <div style={{ width: "100%", userSelect: "none" }}>{children}</div>
    </LinePlotContext.Provider>
  );
}
