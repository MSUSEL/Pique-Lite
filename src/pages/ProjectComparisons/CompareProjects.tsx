import { useAtomValue, useSetAtom } from "jotai";
import { useState, useEffect, useMemo } from "react";
import { State } from "../../state";
import { Box, Flex, Grid, Select, Text } from "@radix-ui/themes";
import { LinePlot } from "../../composites/LinePlot";
import { flatAllProjectVersionsAtom } from "../../state";

interface DataPoint {
  date: string;
  [key: string]: string | number;
}

interface SelectionPoint {
  start: { date: string | Date };
  end: { date: string | Date };
}

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

const CharacteristicSelector = ({
  value,
  onChange,
  characteristicNames,
}: {
  value: string;
  onChange: (value: string) => void;
  characteristicNames: string[];
}) => (
  <Flex align="center" justify="start" gap="2">
    <Text weight="medium" size="3">
      Characteristic
    </Text>
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger />
      <Select.Content>
        {characteristicNames.map((characteristic) => (
          <Select.Item key={characteristic} value={characteristic}>
            {characteristic}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  </Flex>
);

export const ProjectComparisonChart = () => {
  const setCurrentView = useSetAtom(State.currentView);
  useEffect(() => {
    setCurrentView("compare");
  }, [setCurrentView]);

  const allVersionsData = useAtomValue(flatAllProjectVersionsAtom);

  // Extract unique characteristic names from all versions
  const characteristicNames = useMemo(() => {
    if (allVersionsData.length === 0) return [];

    const namesSet = new Set<string>();
    const metadataKeys = ['projectName', 'projectId', 'name', 'fileName', 'date', 'TQI'];

    allVersionsData.forEach(record => {
      Object.keys(record).forEach(key => {
        if (!metadataKeys.includes(key)) {
          namesSet.add(key);
        }
      });
    });

    // Convert to array and sort
    return Array.from(namesSet).sort((a, b) => a.localeCompare(b));
  }, [allVersionsData]);

  const [selectedCharacteristic, setSelectedCharacteristic] = useState(
    characteristicNames[0] || ""
  );

  // Update selected characteristic when available characteristics change
  useEffect(() => {
    if (characteristicNames.length > 0 && !characteristicNames.includes(selectedCharacteristic)) {
      setSelectedCharacteristic(characteristicNames[0]);
    }
  }, [characteristicNames, selectedCharacteristic]);

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
      <Box style={{ width: "1000px" }} className="ChartContainer">
        <LinePlot.Container data={transformedData} xAxisKey="date">
          <Grid columns="3fr auto auto" pl="50px" pr="10px" py="3">
            <CharacteristicSelector
              value={selectedCharacteristic}
              onChange={setSelectedCharacteristic}
              characteristicNames={characteristicNames}
            />
            <LinePlot.ZoomControls.ModeToggle />
            <LinePlot.ZoomControls.ZoomOut />
          </Grid>
          <LinePlot.PlotArea
            lines={lines}
            width={1000}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          />
          <LinePlot.BrushStats>
            {(selection: SelectionPoint) => {
              // Convert selection dates to timestamps for comparison
              const startDate = new Date(selection.start.date).getTime();
              const endDate = new Date(selection.end.date).getTime();

              // Get values within the selection range for each project
              const projectStats = projectNames.map((projectName) => {
                const projectPoints = transformedData
                  .filter((point) => {
                    const pointDate = new Date(point.date).getTime();
                    return pointDate >= startDate && pointDate <= endDate;
                  })
                  .map((point) => Number(point[projectName]) || 0);

                const startValue = Math.min(...projectPoints);
                const endValue = Math.max(...projectPoints);
                const delta = endValue - startValue;

                return {
                  projectName,
                  startValue,
                  endValue,
                  delta,
                };
              });

              return (
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
                  {projectStats.map(
                    ({ projectName, startValue, endValue, delta }, index) => {
                      const color =
                        delta > 0
                          ? "#22c55e"
                          : delta < 0
                          ? "#ef4444"
                          : "#666666";

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
                            style={{
                              fontSize: "0.875rem",
                              color: "var(--gray-9)",
                            }}
                          >
                            {startValue.toFixed(2)} → {endValue.toFixed(2)}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              );
            }}
          </LinePlot.BrushStats>
        </LinePlot.Container>
      </Box>
    </Box>
  );
};

export default ProjectComparisonChart;
