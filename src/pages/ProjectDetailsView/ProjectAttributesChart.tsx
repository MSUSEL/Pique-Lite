import { useFlatCharacteristicData } from "../../state";
import { LinePlot } from "../../composites/LinePlot";
import { useColorMode } from "../../composites/ColorMode";
import { useMemo } from "react";

// Extended color palette for dynamic characteristics
const getCharacteristicColors = (colorMode: 'normal' | 'colorblind', count: number) => {
  const normalColors = [
    "#4CAF50", // green
    "#FF9800", // orange
    "#2196F3", // blue
    "#9C27B0", // purple
    "#F7DC6F", // golden yellow
    "#8BC34A", // teal
    "#E91E63", // pink
    "#00BCD4", // cyan
    "#FF5722", // deep orange
    "#795548", // brown
    "#607D8B", // blue grey
    "#009688", // teal variant
    "#000000"  // black (typically for TQI)
  ];

  const colorblindColors = [
    "#DC267F", // Magenta
    "#FE6100", // Orange
    "#648FFF", // Blue
    "#785EF0", // Purple
    "#FFB000", // Yellow
    "#648FFF", // Blue variant
    "#DC267F", // Magenta variant
    "#FE6100", // Orange variant
    "#785EF0", // Purple variant
    "#FFB000", // Yellow variant
    "#648FFF", // Blue variant
    "#DC267F", // Magenta variant
    "#000000"  // Black
  ];

  const palette = colorMode === 'colorblind' ? colorblindColors : normalColors;

  // Return enough colors for all characteristics, cycling through if needed
  return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
};

// Add type for our data structure
type DataPoint = {
  date: string;
  [key: string]: string | number; // Allow for characteristic names as keys
};

interface ProjectAttributesChartProps {
  projectId: string;
}
export const ProjectAttributesChart = ({
  projectId
}: ProjectAttributesChartProps) => {
  const { colorMode } = useColorMode();
  const flatData = useFlatCharacteristicData(projectId || undefined);
  const flatDataWithStringDates = flatData.map((d) => ({
    ...d,
    date: d.date.toISOString().split("T")[0]
  }));

  // Dynamically extract characteristic names from the data
  const characteristicNames = useMemo(() => {
    if (flatData.length === 0) return [];

    // Get all keys from the first record, excluding metadata fields
    const firstRecord = flatData[0];
    const metadataKeys = ['name', 'fileName', 'date'];

    return Object.keys(firstRecord)
      .filter(key => !metadataKeys.includes(key))
      // Sort to ensure TQI is last (if present) for visual consistency
      .sort((a, b) => {
        if (a === 'TQI') return 1;
        if (b === 'TQI') return -1;
        return a.localeCompare(b);
      });
  }, [flatData]);

  const characteristicColors = getCharacteristicColors(colorMode, characteristicNames.length);
  const lines = characteristicNames.map((characteristic, index) => ({
    dataKey: characteristic as keyof DataPoint,
    name: characteristic,
    stroke: characteristicColors[index],
    strokeWidth: 2
  }));

  return (
    <>
      <LinePlot.Container
        data={flatDataWithStringDates}
        xAxisKey="date"
        style={{ userSelect: "none" }}
      >
        <div className="flex justify-end gap-2 py-1">
          <LinePlot.ZoomControls.ModeToggle />
          <LinePlot.ZoomControls.ZoomOut />
        </div>
        <LinePlot.PlotArea
          aspect={2.5}
          lines={lines}
          // width={600}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        />
        <LinePlot.BrushStats>
          {(selection) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem"
              }}
            >
              {characteristicNames.map((characteristic) => {
                const startValue = Number(
                  selection.start[
                    characteristic as keyof typeof selection.start
                  ]
                );
                const endValue = Number(
                  selection.end[characteristic as keyof typeof selection.end]
                );
                const delta = endValue - startValue;
                const color =
                  delta > 0 ? "#22c55e" : delta < 0 ? "#ef4444" : "#666666";

                return (
                  <div
                    key={characteristic}
                    style={{
                      border: "1px solid var(--gray-6)",
                      borderRadius: "4px",
                      padding: "1rem"
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>{characteristic}</div>
                    <div
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: color
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
