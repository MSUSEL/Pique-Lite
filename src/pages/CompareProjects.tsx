import { useAtomValue } from "jotai";
import { useState } from "react";
import { Box, Select } from "@radix-ui/themes";
import { LinePlot } from "../composites/LinePlot";
import { flatAllProjectVersionsAtom } from "../state";

interface DataPoint {
  date: string;
  [key: string]: string | number;
}

interface SelectionPoint {
  start: Record<string, number>;
  end: Record<string, number>;
}

const CHARACTERISTIC_NAMES = [
  "Availability",
  "Authenticity",
  "Authorization",
  "Confidentiality",
  "Non-repudiation",
  "Integrity",
];

const PROJECT_COLORS = [
  "#E57373", // red
  "#64B5F6", // blue
  "#81C784", // green
  "#FFB74D", // orange
  "#BA68C8", // purple
  "#4DB6AC", // teal
  "#DCE775", // lime
  "#FFD54F", // amber
];

export const ProjectComparisonChart = () => {
  const [selectedCharacteristic, setSelectedCharacteristic] = useState(
    CHARACTERISTIC_NAMES[0]
  );
  const allVersionsData = useAtomValue(flatAllProjectVersionsAtom);

  // Get unique project names
  const projectNames = [...new Set(allVersionsData.map((d) => d.projectName))];

  // Create line configurations
  const lines = projectNames.map((projectName, index) => ({
    dataKey: projectName,
    name: projectName,
    stroke: PROJECT_COLORS[index % PROJECT_COLORS.length],
    strokeWidth: 2,
  }));

  // Transform data for Recharts
  const transformedData = allVersionsData.reduce((acc: DataPoint[], record) => {
    const dateStr = new Date(record.date).toISOString().split("T")[0];
    const existingPoint = acc.find((p) => p.date === dateStr);

    const characteristicValue =
      record[selectedCharacteristic.toLowerCase()] ??
      record[selectedCharacteristic] ??
      0;

    if (existingPoint) {
      existingPoint[record.projectName] = characteristicValue;
    } else {
      const newPoint = {
        date: dateStr,
        [record.projectName]: characteristicValue,
      };
      acc.push(newPoint);
    }

    return acc;
  }, []);

  // Sort by date
  transformedData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Box>
      <Box mb="4">
        <Select.Root
          value={selectedCharacteristic}
          onValueChange={setSelectedCharacteristic}
        >
          <Select.Trigger />
          <Select.Content>
            {CHARACTERISTIC_NAMES.map((characteristic) => (
              <Select.Item key={characteristic} value={characteristic}>
                {characteristic}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Box>

      <Box style={{ width: "1000px" }} className="ChartContainer">
        <LinePlot.Container data={transformedData} xAxisKey="date">
          <LinePlot.PlotArea
            lines={lines}
            width={1000}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          />
          <LinePlot.ZoomControls />
          <LinePlot.BrushStats>
            {(selection: SelectionPoint) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${Math.min(
                    projectNames.length,
                    3
                  )}, 1fr)`,
                  gap: "1rem",
                }}
              >
                {projectNames.map((projectName, index) => {
                  const startValue = Number(selection.start[projectName]) || 0;
                  const endValue = Number(selection.end[projectName]) || 0;
                  const delta = endValue - startValue;
                  const color =
                    delta > 0 ? "#22c55e" : delta < 0 ? "#ef4444" : "#666666";

                  return (
                    <div
                      key={projectName}
                      style={{
                        border: "1px solid var(--gray-6)",
                        borderRadius: "4px",
                        padding: "1rem",
                        borderLeft: `4px solid ${
                          PROJECT_COLORS[index % PROJECT_COLORS.length]
                        }`,
                      }}
                    >
                      <div style={{ fontWeight: 500 }}>{projectName}</div>
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
      </Box>
    </Box>
  );
};

export default ProjectComparisonChart;
