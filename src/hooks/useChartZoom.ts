import { useState, useRef } from "react";
import type { CategoricalChartState } from "recharts";

interface UseChartZoomProps<T> {
  enabled: boolean;
  initialData: T[];
  xAxisKey: keyof T;
  onZoom?: (selection: { start: T; end: T }) => void;
}

interface ZoomState<T> {
  data: T[];
  refAreaLeft: string;
  refAreaRight: string;
  isZooming: boolean;
  shouldAnimate: boolean;
  xAxisKey: keyof T;
}

export function useChartZoom<T>({
  enabled,
  initialData,
  xAxisKey,
  onZoom,
}: UseChartZoomProps<T>) {
  const [state, setState] = useState<ZoomState<T>>({
    data: initialData,
    refAreaLeft: "",
    refAreaRight: "",
    isZooming: false,
    shouldAnimate: true,
    xAxisKey,
  });

  const isZoomingRef = useRef(false);

  const zoom = () => {
    if (!enabled) return;

    if (state.refAreaLeft === state.refAreaRight || state.refAreaRight === "") {
      setState((prev) => ({ ...prev, refAreaLeft: "", refAreaRight: "" }));
      return;
    }

    const startIndex = initialData.findIndex(
      (item) => item[xAxisKey] === state.refAreaLeft
    );
    const endIndex = initialData.findIndex(
      (item) => item[xAxisKey] === state.refAreaRight
    );

    if (startIndex !== -1 && endIndex !== -1) {
      const [start, end] =
        startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];

      const selectedData = initialData.slice(start, end + 1);

      isZoomingRef.current = true;
      setState((prev) => ({
        ...prev,
        data: selectedData,
        refAreaLeft: "",
        refAreaRight: "",
        shouldAnimate: true,
      }));

      if (onZoom && selectedData.length >= 2) {
        onZoom({
          start: selectedData[0],
          end: selectedData[selectedData.length - 1],
        });
      }

      setTimeout(() => {
        isZoomingRef.current = false;
      }, 300);
    }
  };

  const zoomOut = () => {
    if (!enabled) return;

    isZoomingRef.current = true;
    setState((prev) => ({
      ...prev,
      data: initialData,
      refAreaLeft: "",
      refAreaRight: "",
      shouldAnimate: true,
    }));

    setTimeout(() => {
      isZoomingRef.current = false;
    }, 300);
  };

  const handleMouseDown = (e: CategoricalChartState) => {
    if (!enabled) return;
    if (e?.activeLabel) {
      setState((prev) => ({ ...prev, refAreaLeft: e.activeLabel }));
    }
  };

  const handleMouseMove = (e: CategoricalChartState) => {
    if (!enabled) return;
    if (e?.activeLabel && state.refAreaLeft) {
      setState((prev) => ({ ...prev, refAreaRight: e.activeLabel }));
    }
  };

  const handleMouseUp = () => {
    if (!enabled) return;
    zoom();
  };

  return {
    zoomState: state,
    zoomHandlers: {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      zoomOut,
    },
  };
}
