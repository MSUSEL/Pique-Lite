import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Flex, Button, Text } from "@radix-ui/themes";
import { CheckboxGroup } from "@radix-ui/themes";

const Filters: React.FC<{ onFilterChange: (filters: string[]) => void }> = ({
  onFilterChange,
}) => {
  const checkboxVals = ["Severe", "High", "Elevated", "Guarded", "Low"];
  const [selectedFilters, setSelectedFilters] =
    useState<string[]>(checkboxVals);

  const handleValueChange = (values: string[]) => {
    setSelectedFilters(values);
    onFilterChange(values);
  };

  return (
    <Box>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant="soft">
            <MixerHorizontalIcon width="16" height="16" />
            Filters
          </Button>
        </Popover.Trigger>
        <Popover.Content
          style={{
            zIndex: 999,
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <Flex direction="column" gap="1">
            <Text size="2" color="gray" align="left">
              TQI Risk:
            </Text>
            <CheckboxGroup.Root
              name="riskFiltering"
              value={selectedFilters}
              onValueChange={handleValueChange}
            >
              {checkboxVals.map((val) => (
                <CheckboxGroup.Item key={val} value={val}>
                  {val}
                </CheckboxGroup.Item>
              ))}
            </CheckboxGroup.Root>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};
export default Filters;
