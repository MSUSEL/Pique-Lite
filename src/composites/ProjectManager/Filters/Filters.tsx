import React from "react";
import {
  Root as ScrollAreaRoot,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Button,
  Text,
  Theme,
  Popover,
  Strong,
  CheckboxGroup,
} from "@radix-ui/themes";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";

export interface Filters {
  date?: DateRange;
  visibility: string[];
  status: string[];
}

const VersionFilters: React.FC<{
  filters: Filters;
  setFilters: (filters: Filters) => void;
  defaultDate: DateRange;
}> = ({ filters, setFilters, defaultDate }) => {
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
              padding: "10px",
              width: "35vw",
              height: "50vh",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              color: "black",
            }}
          >
            <ScrollAreaRoot>
              <ScrollAreaViewport>
                <Flex direction="column" gap="3">
                  <Strong>Filter Files</Strong>
                  <Box>
                    <Text>Visibility</Text>
                    <CheckboxGroup.Root
                      value={filters.visibility}
                      onValueChange={(value) =>
                        setFilters({
                          ...filters,
                          visibility: value as string[],
                        })
                      }
                    >
                      <CheckboxGroup.Item value="visible">
                        <Text>Visible</Text>
                      </CheckboxGroup.Item>
                      <CheckboxGroup.Item value="hidden">
                        <Text>Hidden</Text>
                      </CheckboxGroup.Item>
                    </CheckboxGroup.Root>
                  </Box>
                  <Box>
                    <Text>Status</Text>
                    <CheckboxGroup.Root
                      value={filters.status}
                      onValueChange={(value) =>
                        setFilters({ ...filters, status: value as string[] })
                      }
                    >
                      <CheckboxGroup.Item value="valid">
                        <Text>Valid</Text>
                      </CheckboxGroup.Item>
                      <CheckboxGroup.Item value="invalid">
                        <Text>Invalid</Text>
                      </CheckboxGroup.Item>
                    </CheckboxGroup.Root>
                  </Box>
                  <Box>
                    <Text>Date</Text>
                    <DateRangePicker
                      date={filters.date}
                      setDate={(date) =>
                        setFilters({ ...filters, date: date as DateRange })
                      }
                    />
                  </Box>
                  <Button
                    variant="soft"
                    onClick={() =>
                      setFilters({
                        visibility: ["visible", "hidden"],
                        status: ["valid", "invalid"],
                        date: defaultDate,
                      })
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

export default VersionFilters;
