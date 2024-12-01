import { useContext } from "react";
import { LinePlotContext } from "../context";
import type { LinePlotContextType } from "../types";

export function useLinePlotContext<T>() {
  const context = useContext(LinePlotContext);
  if (!context) {
    throw new Error(
      "LinePlot components must be used within a LinePlot.Container"
    );
  }
  return context as LinePlotContextType<T>;
}
