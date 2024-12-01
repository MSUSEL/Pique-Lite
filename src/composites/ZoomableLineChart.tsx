import { LinePlot } from "./LinePlot";
import type { PlotAreaProps } from "./LinePlot";
import { PlotArea } from "./LinePlot/PlotArea";
import { ZoomControls } from "./LinePlot/ZoomControls";

export function ZoomableLineChart<T extends Record<string, unknown>>({
  data,
  lines,
  height,
  xAxisKey = "name" as keyof T,
  width,
  margin,
}: PlotAreaProps<T>) {
  return (
    <LinePlot.Container data={data} xAxisKey={xAxisKey}>
      <div style={{ width: "100%", userSelect: "none" }}>
        <ZoomControls className="mb-4" />
        <PlotArea height={height} width={width} margin={margin} lines={lines} />
      </div>
    </LinePlot.Container>
  );
}
