import React from "react";
import {
  Root as ScrollAreaRoot,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Flex, Button, Text, Theme, Popover } from "@radix-ui/themes";
import { CheckboxGroup } from "@radix-ui/themes";
import { Projects, Version } from "../../state";
import { SliderFilter } from "./SliderFilter";

//Filters element for projects in overview
//Brings in states from parent element and changes them with 'onFilterChange'
const Filters: React.FC<{
  selectedFilters: string[];
  sliderValue: number[];
  onFilterChange: (filters: string[], newValues: number[]) => void;
  projects?: Projects;
  versions?: Version[];
}> = ({ selectedFilters, sliderValue, onFilterChange, projects, versions }) => {
  //Temporary values to fill out checkboxes later
  const checkboxVals = ["Severe", "High", "Elevated", "Guarded", "Low"];

  return (
    <Box>
      <Popover.Root>
        <Popover.Trigger>
          <Button variant="soft">
            <MixerHorizontalIcon width="16" height="16" />
            Filters
          </Button>
        </Popover.Trigger>
        <Theme>
          <Popover.Content
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              width: "65vw",
              height: "75vh",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              color: "black",
            }}
          >
            <ScrollAreaRoot style={{ height: "calc(100% - 40px)" }}>
              <ScrollAreaViewport
                style={{
                  height: "100%",
                }}
              >
                <Flex direction="column" gap="5">
                  {/* Checkboxes to filter on risk level */}
                  <Box style={{ justifyContent: "center" }}>
                    <Text size="2" color="gray">
                      Filter Based on Risk Level:
                    </Text>
                    <CheckboxGroup.Root
                      name="riskFiltering"
                      value={selectedFilters}
                      onValueChange={(values) =>
                        onFilterChange(values, sliderValue)
                      }
                    >
                      {checkboxVals.map((val) => (
                        <CheckboxGroup.Item key={val} value={val}>
                          {val}
                        </CheckboxGroup.Item>
                      ))}
                    </CheckboxGroup.Root>
                  </Box>
                  {/* Slider filter */}
                  <Box>
                    <Text size="2" color="gray">
                      Filter Based on TQI Value:
                    </Text>
                    <SliderFilter
                      value={sliderValue}
                      versions={versions ? versions : undefined}
                      projects={projects ? projects : undefined}
                      onValueChange={(newValues) =>
                        onFilterChange(selectedFilters, newValues)
                      }
                    />
                  </Box>
                  {/* Reset filters */}
                  <Button
                    variant="soft"
                    onClick={() =>
                      onFilterChange(
                        ["Severe", "High", "Elevated", "Guarded", "Low"],
                        [0, 1.0]
                      )
                    }
                  >
                    Reset Filters
                  </Button>
                </Flex>
              </ScrollAreaViewport>
            </ScrollAreaRoot>
          </Popover.Content>
        </Theme>
      </Popover.Root>
    </Box>
  );
};

export default Filters;
