import { useAtomValue } from "jotai";
import { flatCharacteristicDataAtom } from "../../state";
import { LinePlot } from "../../composites/LinePlot";
import { Flex } from "@radix-ui/themes";

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

// Add type for our data structure
type DataPoint = {
  date: string;
  [key: string]: string | number; // Allow for characteristic names as keys
};

export const ProjectAttributesChart = () => {
  const flatData = useAtomValue(flatCharacteristicDataAtom);
  const flatDataWithStringDates = flatData.map((d) => ({
    ...d,
    date: d.date.toISOString().split("T")[0],
  }));

  const lines = CHARACTERISTIC_NAMES.map((characteristic, index) => ({
    dataKey: characteristic as keyof DataPoint,
    name: characteristic,
    stroke: CHARACTERISTIC_COLORS[index % CHARACTERISTIC_COLORS.length],
    strokeWidth: 2,
  }));

  return (
    <>
      <LinePlot.Container
        data={flatDataWithStringDates}
        xAxisKey="date"
        style={{ userSelect: "none" }}
      >
        <Flex justify="end" align="end" gap="2" pr="20px" pb="2">
          <LinePlot.ZoomControls.ModeToggle />
          <LinePlot.ZoomControls.ZoomOut />
        </Flex>
        <LinePlot.PlotArea
          lines={lines}
          width={1000}
          height={250}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        />
        <LinePlot.BrushStats>
          {(selection) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
              }}
            >
              {CHARACTERISTIC_NAMES.map((characteristic) => {
                const startValue =
                  selection.start[
                    characteristic as keyof typeof selection.start
                  ];
                const endValue =
                  selection.end[characteristic as keyof typeof selection.end];
                const delta = Number(endValue) - Number(startValue);
                const color =
                  delta > 0 ? "#22c55e" : delta < 0 ? "#ef4444" : "#666666";

                return (
                  <div
                    key={characteristic}
                    style={{
                      border: "1px solid var(--gray-6)",
                      borderRadius: "4px",
                      padding: "1rem",
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>{characteristic}</div>
                    <div
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: color,
                      }}
                    >
                      {delta > 0 ? "+" : ""}
                      {delta.toFixed(2)}
                    </div>
                    <div
                      style={{ fontSize: "0.875rem", color: "var(--gray-9)" }}
                    >
                      {startValue.toFixed(2)} → {endValue.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </LinePlot.BrushStats>
      </LinePlot.Container>
    </>
  );
};
