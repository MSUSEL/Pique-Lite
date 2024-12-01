import React, { useState, useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { Flex, SegmentedControl } from "@radix-ui/themes";

type ChartMode = "brush" | "tooltip";

interface ZoomableLineChartProps<T extends Record<string, any>> {
  data: T[];
  lines: Array<{
    dataKey: keyof T;
    stroke?: string;
    name?: string;
  }>;
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

const ZoomableLineChart = <T extends Record<string, any>>({
  data: initialData,
  lines,
  height = 400,
  xAxisKey = "name",
  width,
  margin,
}: ZoomableLineChartProps<T>) => {
  const [data, setData] = useState(initialData);
  console.log("Chart datum: ");
  console.log(initialData[0]);
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [mode, setMode] = useState<ChartMode>("brush");
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // We'll use this to track if we're zooming
  const isZooming = useRef(false);

  const zoom = () => {
    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }

    const startIndex = initialData.findIndex(
      (item) => item[xAxisKey] === refAreaLeft
    );
    const endIndex = initialData.findIndex(
      (item) => item[xAxisKey] === refAreaRight
    );

    if (startIndex !== -1 && endIndex !== -1) {
      const [start, end] =
        startIndex < endIndex ? [startIndex, endIndex] : [endIndex, startIndex];

      isZooming.current = true;
      setShouldAnimate(true);
      setData(initialData.slice(start, end + 1));
      setRefAreaLeft("");
      setRefAreaRight("");

      // Reset the zooming flag after animation
      setTimeout(() => {
        isZooming.current = false;
      }, 300); // matches animationDuration
    }
  };

  const zoomOut = () => {
    isZooming.current = true;
    setShouldAnimate(true);
    setData(initialData);
    setRefAreaLeft("");
    setRefAreaRight("");

    // Reset the zooming flag after animation
    setTimeout(() => {
      isZooming.current = false;
    }, 300);
  };

  const handleModeChange = (value: ChartMode) => {
    if (value) {
      setShouldAnimate(false); // Disable animation during mode changes
      setMode(value);
    }
  };

  const handleMouseDown = (e: any) => {
    if (mode === "brush") {
      e && setRefAreaLeft(e.activeLabel);
    }
  };

  const handleMouseMove = (e: any) => {
    if (mode === "brush") {
      e && refAreaLeft && setRefAreaRight(e.activeLabel);
    }
  };

  const handleMouseUp = () => {
    if (mode === "brush") {
      zoom();
    }
  };
  return (
    <div style={{ width: "100%", userSelect: "none" }}>
      <Flex gap="3" align="center" mb="4">
        <SegmentedControl.Root value={mode} onValueChange={handleModeChange}>
          <SegmentedControl.Item value="brush">
            Brush Mode
          </SegmentedControl.Item>
          <SegmentedControl.Item value="tooltip">
            Tooltip Mode
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={zoomOut}
        >
          Zoom Out
        </button>
      </Flex>

      <ResponsiveContainer width={width ?? "100%"} height={height}>
        <LineChart
          data={data}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          margin={margin}
        >
          {mode === "brush" && refAreaLeft && refAreaLeft ? (
            <ReferenceArea
              className="ReferenceArea"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={1}
              fill="#8884d8"
              fillOpacity={1}
            />
          ) : null}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey={xAxisKey as string}
            tickFormatter={(value) => {
              // If it's a Date object or date string, format it
              if (
                value instanceof Date ||
                (typeof value === "string" && value.includes("-"))
              ) {
                const date = value instanceof Date ? value : new Date(value);
                return date.toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                });
              }
              return value;
            }}
            axisLine={{ value: (value) => value }}
          />
          <YAxis allowDataOverflow />
          {mode === "tooltip" && <Tooltip />}
          <Legend />

          {lines.map(({ dataKey, stroke, name }) => (
            <Line
              key={dataKey.toString()}
              type="monotone"
              dataKey={dataKey as string}
              stroke={stroke}
              name={name}
              isAnimationActive={shouldAnimate}
              animationDuration={300}
              connectNulls={true}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ZoomableLineChart;
