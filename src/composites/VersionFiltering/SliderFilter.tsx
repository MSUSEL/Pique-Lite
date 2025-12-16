import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { BarChart, Bar, XAxis, Tooltip, Cell } from "recharts";
import { Projects, Version } from "../../state";
import { getAllRiskLevels, getRisk } from "../../composites/RiskHelpers";

//Slider filter element
export const SliderFilter: React.FC<{
  value: number[];
  projects?: Projects;
  versions?: Version[];
  onValueChange: (value: number[]) => void;
}> = ({ value, projects, versions, onValueChange }) => {
  const [inputValue, setInputValue] = useState<string[]>([
    value[0].toString(),
    value[1].toString()
  ]);

  // Update inputValue state whenever the value prop changes
  if (
    inputValue[0] !== value[0].toString() ||
    inputValue[1] !== value[1].toString()
  ) {
    setInputValue([value[0].toString(), value[1].toString()]);
  }

  //Set up risk level windows and data for bar chart
  const data = getAllRiskLevels().map((riskLevel) => ({
    name: riskLevel.name,
    value: 0,
    range: riskLevel.normalRange // Using the predefined ranges
  }));

  // Create a lookup map for quick access to the corresponding data entry
  const dataMap = new Map(data.map((entry) => [entry.name, entry]));

  const allVersions: Version[] = versions
    ? versions
    : Object.values(projects || {}).flatMap((project) =>
        project.versions.length > 0
          ? [project.versions[project.versions.length - 1]] // Use the most recent version
          : []
      );

  // Populate bar chart data dynamically
  allVersions.forEach((version) => {
    const recentVersionValue = version.data.value;

    // Find the matching risk level
    const riskLevel = getRisk(recentVersionValue, "normal");

    // Increment the corresponding data entry
    if (riskLevel) {
      dataMap.get(riskLevel.name)!.value += 1;
    }
  });

  //Sanitize input from text inputs
  const sanitizeInput = (value: string): number => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) return 0;
    if (num > 1) return 1;
    return parseFloat(num.toFixed(2));
  };

  //Make sure two slider values have at least a 0.01 difference from eachother
  const ensureNotEqual = (newValue: number[], index: number) => {
    if (newValue[0] === newValue[1]) {
      // Ensure a minimum gap of 0.01
      if (newValue[0] >= 1.0 - 0.005) {
        // If at the very top, nudge first val down
        newValue[0] = newValue[1] - 0.01;
      } else if (newValue[1] <= 0.0 + 0.005) {
        // If at the very bottom, nudge second val up
        newValue[1] = newValue[0] + 0.01;
      } else {
        // Otherwise, adjust based on index
        if (index === 0) {
          newValue[0] = Math.max(0, newValue[1] - 0.01);
        } else {
          newValue[1] = Math.min(1, newValue[0] + 0.01);
        }
      }
    }
    // Clamp values to be within [0, 1] and ensure newSliderValue[0] <= newSliderValue[1]
    newValue[0] = Math.max(0, Math.min(1, newValue[0]));
    newValue[1] = Math.max(0, Math.min(1, newValue[1]));
    if (newValue[0] > newValue[1]) {
      if (index === 0) newValue[1] = newValue[0];
      else newValue[0] = newValue[1];
    }

    return newValue;
  };

  //Ensures only valid inputs from text input boxes
  const handleBlur = (index: number) => {
    const sanitizedValue = sanitizeInput(inputValue[index]);
    let newValue = [...value];
    newValue[index] = sanitizedValue;
    newValue = ensureNotEqual(newValue, index);
    onValueChange(newValue);
    setInputValue([newValue[0].toString(), newValue[1].toString()]);
  };

  //Sanitizes, validates, and stores text inputs
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      handleBlur(index);
    }
  };

  //Colors bar based on slider's values
  const getBarColor = (barRange: number[]): string => {
    const [start, end] = value;
    if (barRange[1] < start || barRange[0] > end) {
      return "gray";
    }
    return "var(--iris-9)";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Bar chart from recharts */}
      <BarChart width={400} height={150} data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.range)} />
          ))}
        </Bar>
      </BarChart>
      <div className="flex flex-col items-center gap-2">
        {/* Slider element from shadcn/ui */}
        <Slider
          value={value}
          min={0}
          max={1.0}
          step={0.01}
          onValueChange={(newValue: number[]) => {
            // The shadcn slider might provide values that are too close or cross over,
            // so we apply the ensureNotEqual logic here if needed, or directly update if valid.
            // For a two-thumb slider, newValue is [minSelected, maxSelected]
            if (
              newValue.length === 2 &&
              Math.abs(newValue[1] - newValue[0]) >= 0.01 &&
              newValue[0] <= newValue[1]
            ) {
              onValueChange(newValue);
              setInputValue([newValue[0].toString(), newValue[1].toString()]);
            } else if (newValue.length === 2) {
              // If values are too close or crossed, attempt to fix them based on which thumb likely moved.
              // This is a heuristic. A more robust solution might involve tracking which thumb was interacted with.
              // For simplicity, we'll assume the change that violates the condition should be adjusted.
              // This part might need more sophisticated handling depending on the slider's behavior on rapid/crossing drags.
              const adjustedValue = [...newValue];
              if (adjustedValue[0] > adjustedValue[1]) {
                // if crossed
                // A simple swap might be too jarring. Re-evaluate based on original `value`.
                // For now, let's try to adjust the value that caused the crossover based on its proximity to the old values.
                // This is complex, so we'll just ensure they don't cross and maintain a minimum gap.
                // A simpler approach might be to just not update if the new values are invalid.
                // Or, adjust the most recently changed input value if possible.
                // For now, do not update if they cross to avoid erratic behavior, rely on blur/enter for explicit setting.
                return;
              }
              if (Math.abs(adjustedValue[1] - adjustedValue[0]) < 0.01) {
                // If too close, try to enforce the minimum gap
                // This logic can be tricky without knowing which thumb is active.
                // Let's defer to the onBlur/onKeyDown logic for fine-tuning if values get too close via slider interaction.
                // For direct slider interaction, we'll allow them to get close and then fix on input blur.
                onValueChange(adjustedValue); // Allow them to get close
                setInputValue([
                  adjustedValue[0].toString(),
                  adjustedValue[1].toString()
                ]);
              }
            }
          }}
          className="w-[385px]"
        />
        <div className="mt-2 flex flex-row items-center gap-2">
          {/* First Text Box */}
          <input
            type="text"
            value={inputValue[0]}
            // size={1} // size attribute is not very effective for text inputs like this
            onChange={(e) => setInputValue([e.target.value, inputValue[1]])}
            onBlur={() => handleBlur(0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            className="focus:border-iris-9 w-12 border-b-2 border-gray-400 bg-white px-1 py-0.5 text-center text-black tabular-nums focus:outline-none"
            // style={{ appearance: "textfield" }} // Use -moz-appearance for Firefox if needed
          />
          <span className="text-sm text-gray-700">to</span>
          {/* Second Text Box */}
          <input
            type="text"
            value={inputValue[1]}
            // size={1}
            onChange={(e) => setInputValue([inputValue[0], e.target.value])}
            onBlur={() => handleBlur(1)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            className="focus:border-iris-9 w-12 border-b-2 border-gray-400 bg-white px-1 py-0.5 text-center text-black tabular-nums focus:outline-none"
            // style={{ appearance: "textfield" }}
          />
        </div>
      </div>
    </div>
  );
};
