import { useAtomValue } from "jotai";
import { useState } from "react";
import { Box, Select } from "@radix-ui/themes";
import ZoomableLineChart from "../composites/ZoomableLineChart";
import { flatAllProjectVersionsAtom } from "../state";

interface DataPoint {
  date: string;
  [key: string]: string | number;
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
  // Group by date to create data points
  const transformedData = allVersionsData.reduce((acc: DataPoint[], record) => {
    // Format the date to be used as the x-axis value
    const dateStr = new Date(record.date).toISOString().split("T")[0];

    const existingPoint = acc.find((p) => p.date === dateStr);

    if (existingPoint) {
      existingPoint[record.projectName] = record[
        selectedCharacteristic
      ] as number;
    } else {
      const newPoint = {
        date: dateStr,
        [record.projectName]: record[selectedCharacteristic] as number,
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
        <ZoomableLineChart
          data={transformedData}
          lines={lines}
          xAxisKey="date"
          width={1000}
          height={300}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        />
      </Box>
    </Box>
  );
};

export default ProjectComparisonChart;
