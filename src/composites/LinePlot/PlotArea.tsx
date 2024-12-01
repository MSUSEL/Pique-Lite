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
import { useLinePlotContext } from "./context";
import type { PlotAreaProps } from "./context";

export function PlotArea<T extends Record<string, unknown>>({
  height = 400,
  width,
  margin,
  lines,
}: Omit<PlotAreaProps<T>, "data" | "xAxisKey">) {
  const { mode, zoomState, zoomHandlers } = useLinePlotContext<T>();

  return (
    <ResponsiveContainer width={width ?? "100%"} height={height}>
      <LineChart
        data={zoomState.data}
        onMouseDown={zoomHandlers.handleMouseDown}
        onMouseMove={zoomHandlers.handleMouseMove}
        onMouseUp={zoomHandlers.handleMouseUp}
        margin={margin}
      >
        {mode === "brush" && zoomState.refAreaLeft && (
          <ReferenceArea
            x1={zoomState.refAreaLeft}
            x2={zoomState.refAreaRight}
            strokeOpacity={0.3}
            fill="#8884d8"
            fillOpacity={0.3}
          />
        )}
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          allowDataOverflow
          dataKey={zoomState.xAxisKey as string}
          tickFormatter={(value) => {
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
            isAnimationActive={zoomState.shouldAnimate}
            animationDuration={300}
            connectNulls={true}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
