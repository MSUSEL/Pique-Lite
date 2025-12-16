import { Container } from "./Container";
import { PlotArea } from "./PlotArea";
import * as ZoomControls from "./ZoomControls";
import { BrushStats } from "./BrushStats";
import type { PlotAreaProps, LineConfig, BrushSelection } from "./context";

export const LinePlot = {
  Container,
  PlotArea,
  ZoomControls,
  BrushStats,
};

export type { PlotAreaProps, LineConfig, BrushSelection };
