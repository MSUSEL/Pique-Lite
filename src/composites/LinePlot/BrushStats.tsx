import React from "react";
import { useLinePlotContext } from "./hooks/useLinePlotContext";
import type { BrushSelection } from "./types";

interface BrushStatsProps<T> {
  children: (selection: BrushSelection<T>) => React.ReactNode;
  fallback?: React.ReactNode;
}

export function BrushStats<T>({
  children,
  fallback = null,
}: BrushStatsProps<T>) {
  const { currentSelection } = useLinePlotContext<T>();

  if (!currentSelection) {
    return <>{fallback}</>;
  }

  return <>{children(currentSelection)}</>;
}
