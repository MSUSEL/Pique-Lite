import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  Root as DialogRoot,
} from "@radix-ui/react-dialog";
import {
  Root as ScrollAreaRoot,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import { Cross1Icon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Flex, Button, Text, Slider, Theme } from "@radix-ui/themes";
import { CheckboxGroup } from "@radix-ui/themes";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Projects } from "../../state";

const Filters: React.FC<{
  onFilterChange: (filters: string[], newValues: number[]) => void;
  projects: Projects;
}> = ({ onFilterChange, projects }) => {
  const checkboxVals = ["Severe", "High", "Elevated", "Guarded", "Low"];
  const [selectedFilters, setSelectedFilters] =
    useState<string[]>(checkboxVals);
  const [sliderValue, setSliderValue] = useState([0, 1.0]);

  const handleCheckboxChange = (values: string[]) => {
    setSelectedFilters(values);
    onFilterChange(values, sliderValue);
  };

  const handleSliderChange = (values: number[]) => {
    setSliderValue(values);
    onFilterChange(selectedFilters, values);
  };

  return (
    <Box>
      <DialogRoot>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="soft">
              <MixerHorizontalIcon width="16" height="16" />
              Filters
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <Theme>
              <DialogOverlay
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  position: "fixed",
                  inset: 0,
                }}
              />
              <DialogContent
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "20px",
                  width: "65vw",
                  height: "75vh",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  color: "black",
                }}
              >
                <DialogTitle style={{ marginBottom: "20px", marginTop: "0px" }}>
                  Filters
                  <Text size="2" color="gray" style={{ marginLeft: "10px" }}>
                    Based on Project's Newest Version
                  </Text>
                </DialogTitle>
                <DialogClose asChild>
                  <button
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: "blue",
                      background: "none",
                      cursor: "pointer",
                    }}
                    aria-label="Close"
                  >
                    <Cross1Icon />
                  </button>
                </DialogClose>
                <ScrollAreaRoot style={{ height: "calc(100% - 40px)" }}>
                  <ScrollAreaViewport
                    style={{
                      height: "100%",
                    }}
                  >
                    <Flex direction="column" gap="5">
                      <Box style={{ justifyContent: "center" }}>
                        <Text size="2" color="gray">
                          Filter Based on Risk Level:
                        </Text>
                        <CheckboxGroup.Root
                          name="riskFiltering"
                          value={selectedFilters}
                          onValueChange={handleCheckboxChange}
                        >
                          {checkboxVals.map((val) => (
                            <CheckboxGroup.Item key={val} value={val}>
                              {val}
                            </CheckboxGroup.Item>
                          ))}
                        </CheckboxGroup.Root>
                      </Box>
                      <Box>
                        <Text size="2" color="gray">
                          Filter Based on TQI Value:
                        </Text>
                        <SliderFilter
                          value={sliderValue}
                          projects={projects}
                          onValueChange={handleSliderChange}
                        />
                      </Box>
                    </Flex>
                  </ScrollAreaViewport>
                </ScrollAreaRoot>
              </DialogContent>
            </Theme>
          </DialogPortal>
        </Dialog>
      </DialogRoot>
    </Box>
  );
};

const SliderFilter: React.FC<{
  value: number[];
  projects: Projects;
  onValueChange: (value: number[]) => void;
}> = ({ value, projects, onValueChange }) => {
  const [inputValue, setInputValue] = useState<string[]>([
    value[0].toString(),
    value[1].toString(),
  ]);

  const data = [
    { name: "Low", value: 0, range: [0, 0.2] },
    { name: "Guarded", value: 0, range: [0.2, 0.4] },
    { name: "Elevated", value: 0, range: [0.4, 0.6] },
    { name: "High", value: 0, range: [0.6, 0.8] },
    { name: "Severe", value: 0, range: [0.8, 1.0] },
  ];

  Object.values(projects).forEach((project) => {
    if (project.versions.length > 0) {
      const recentVersionValue =
        project.versions[project.versions.length - 1].data.value;
      if (recentVersionValue >= 0 && recentVersionValue < 0.2) {
        data[0].value += 1;
      } else if (recentVersionValue >= 0.2 && recentVersionValue < 0.4) {
        data[1].value += 1;
      } else if (recentVersionValue >= 0.4 && recentVersionValue < 0.6) {
        data[2].value += 1;
      } else if (recentVersionValue >= 0.6 && recentVersionValue < 0.8) {
        data[3].value += 1;
      } else if (recentVersionValue >= 0.8 && recentVersionValue <= 1.0) {
        data[4].value += 1;
      }
    }
  });

  const sanitizeInput = (value: string): number => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) return 0;
    if (num > 1) return 1;
    return parseFloat(num.toFixed(2));
  };

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

  const handleBlur = (index: number) => {
    const sanitizedValue = sanitizeInput(inputValue[index]);
    let newValue = [...value];
    newValue[index] = sanitizedValue;
    newValue = ensureNotEqual(newValue, index);
    onValueChange(newValue);
    setInputValue([newValue[0].toString(), newValue[1].toString()]);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      handleBlur(index);
    }
  };

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

export default Filters;
