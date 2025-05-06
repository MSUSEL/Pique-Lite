import React, { useState } from "react";
import { Box, Flex, Text, Slider } from "@radix-ui/themes";
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
    value[1].toString(),
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
    range: riskLevel.normalRange, // Using the predefined ranges
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
      if (index === 0) {
        newValue[0] = Math.max(0, newValue[1] - 0.01);
      } else {
        newValue[1] = Math.min(1, newValue[0] + 0.01);
      }
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
    <Box>
      <Flex direction="column" gap="1" align="center">
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
        <Flex direction="column" gap="2">
          {/* Slider element from Radix */}
          <Slider
            value={value}
            size="1"
            min={0}
            max={1.0}
            step={0.01}
            onValueChange={(newValue: number[]) => {
              if (Math.abs(newValue[1] - newValue[0]) >= 0.01) {
                onValueChange(newValue);
                setInputValue([newValue[0].toString(), newValue[1].toString()]);
              }
            }}
            style={{ width: "385px" }}
          />
          <Flex direction="row" gap="2" mt="2" align="center">
            {/* First Text Box */}
            <input
              type="text"
              value={inputValue[0]}
              size={1}
              onChange={(e) => setInputValue([e.target.value, inputValue[1]])}
              onBlur={() => handleBlur(0)}
              onKeyDown={(e) => handleKeyDown(e, 0)}
              style={{
                background: "white",
                border: "none",
                borderBottom: "2px solid gray",
                color: "black",
                appearance: "textfield",
              }}
            />
            <Text>to</Text>
            {/* Second Text Box */}
            <input
              type="text"
              value={inputValue[1]}
              size={1}
              onChange={(e) => setInputValue([inputValue[0], e.target.value])}
              onBlur={() => handleBlur(1)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
              style={{
                background: "white",
                border: "none",
                borderBottom: "2px solid gray",
                color: "black",
                appearance: "textfield",
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
