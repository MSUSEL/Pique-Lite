import { useAtomValue } from "jotai";
import { flatCharacteristicDataAtom } from "../state";
import ZoomableLineChart from "./ZoomableLineChart";

const CHARACTERISTIC_NAMES = [
  "Availability",
  "Authenticity",
  "Authorization",
  "Confidentiality",
  "Non-repudiation",
  "Integrity",
];

const CHARACTERISTIC_COLORS = [
  "#4CAF50", // green for Availability
  "#FF9800", // orange for Authenticity
  "#2196F3", // blue for Authorization
  "#9C27B0", // purple for Confidentiality
  "#F7DC6F", // golden yellow for Non-repudiation
  "#8BC34A", // teal for Integrity
];

export const LinePlot = () => {
  const flatData = useAtomValue(flatCharacteristicDataAtom);

  const lines = CHARACTERISTIC_NAMES.map((characteristic, index) => ({
    dataKey: characteristic,
    name: characteristic,
    stroke: CHARACTERISTIC_COLORS[index % CHARACTERISTIC_COLORS.length],
    strokeWidth: 2,
  }));

  return (
    <ZoomableLineChart
      data={flatData}
      lines={lines}
      width={1000}
      height={250}
      xAxisKey="date"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    />
  );
};
