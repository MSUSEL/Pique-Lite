import { useState, useRef, useEffect } from "react";
// import type { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";
type CategoricalChartState = {
  activeLabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activePayload?: Array<any>;
  activeCoordinate?: {
    x: number;
    y: number;
  };
};
interface UseChartZoomProps<T> {
  enabled: boolean;
  initialData: T[];
  xAxisKey: keyof T;
  onZoom?: (selection: { start: T; end: T }) => void;
  onZoomOut?: () => void;
}

interface ZoomState<T> {
  data: T[];
  refAreaLeft: string;
  refAreaRight: string;
  isZooming: boolean;
  shouldAnimate: boolean;
  xAxisKey: keyof T;
  zoomRange: { start: T; end: T } | null;
}

function getZoomedData<T>({
  data,
  startValue,
  endValue,
  xAxisKey,
}: {
  data: T[];
  startValue: string;
  endValue: string;
  xAxisKey: keyof T;
}): T[] | null {
  const startIndex = data.findIndex((item) => item[xAxisKey] === startValue);
  const endIndex = data.findIndex((item) => item[xAxisKey] === endValue);

  if (startIndex === -1 || endIndex === -1) {
    return null;
  }

  const [start, end] =
    startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];

  return data.slice(start, end + 1);
}

export function useChartZoom<T>({
  enabled,
  initialData,
  xAxisKey,
  onZoom,
  onZoomOut,
}: UseChartZoomProps<T>) {
  const [state, setState] = useState<ZoomState<T>>({
    data: initialData,
    refAreaLeft: "",
    refAreaRight: "",
    isZooming: false,
    shouldAnimate: true,
    xAxisKey,
    zoomRange: null,
  });

  const isZoomingRef = useRef(false);

  useEffect(() => {
    if (state.zoomRange) {
      const newZoomedData = getZoomedData({
        data: initialData,
        startValue: state.zoomRange.start[xAxisKey] as string,
        endValue: state.zoomRange.end[xAxisKey] as string,
        xAxisKey,
      });

      if (newZoomedData) {
        setState((prev) => ({
          ...prev,
          data: newZoomedData,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          data: initialData,
          zoomRange: null,
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        data: initialData,
      }));
    }
  }, [initialData, xAxisKey, state.zoomRange]);

  const zoom = () => {
    if (!enabled) return;

    if (state.refAreaLeft === state.refAreaRight || state.refAreaRight === "") {
      setState((prev) => ({ ...prev, refAreaLeft: "", refAreaRight: "" }));
      return;
    }

    const selectedData = getZoomedData({
      data: initialData,
      startValue: state.refAreaLeft,
      endValue: state.refAreaRight,
      xAxisKey,
    });

    if (selectedData && selectedData.length >= 2) {
      isZoomingRef.current = true;
      setState((prev) => ({
        ...prev,
        data: selectedData,
        refAreaLeft: "",
        refAreaRight: "",
        shouldAnimate: true,
        zoomRange: {
          start: selectedData[0],
          end: selectedData[selectedData.length - 1],
        },
      }));

      onZoom?.({
        start: selectedData[0],
        end: selectedData[selectedData.length - 1],
      });

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
      zoomRange: null,
    }));

    onZoomOut?.();

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
