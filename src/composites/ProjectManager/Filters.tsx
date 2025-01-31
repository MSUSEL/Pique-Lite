import React, { useState, useEffect } from "react";
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
} from "@radix-ui/themes";
import { Version } from "../../state";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

const VersionFilters: React.FC<{
  versions: Version[];
  setFilteredVersions: (versions: Version[]) => void;
}> = ({ versions, setFilteredVersions }) => {
  const getMinDate = () =>
    dayjs(Math.min(...versions.map((v) => new Date(v.date).getTime())));
  const getMaxDate = () =>
    dayjs(Math.max(...versions.map((v) => new Date(v.date).getTime())));

  const [startDate, setStartDate] = useState(getMinDate);
  const [endDate, setEndDate] = useState(getMaxDate);

  // Update startDate & endDate when versions change
  useEffect(() => {
    setStartDate(getMinDate());
    setEndDate(getMaxDate());
  }, [versions]);

  // Filter versions based on selected date range
  useEffect(() => {
    const filtered = versions.filter((v) => {
      const versionDate = dayjs(v.date);
      return (
        versionDate.isAfter(startDate.subtract(1, "day")) &&
        versionDate.isBefore(endDate.add(1, "day"))
      );
    });
    setFilteredVersions(filtered);
  }, [startDate, endDate, versions]);

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
              width: "40vw",
              height: "40vh",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              color: "black",
            }}
          >
            <ScrollAreaRoot style={{ height: "calc(100% - 40px)" }}>
              <ScrollAreaViewport
                style={{
                  height: "100%",
                }}
              >
                <Flex direction="column" gap="3">
                  <Strong>Filter Files</Strong>
                  <Text>Visibility</Text>
                  <Text>Status</Text>
                  <Text>Last modified date</Text>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Flex direction="row" gap="2">
                      <DateField
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) =>
                          setStartDate(newValue || getMinDate())
                        }
                      />
                      <DateField
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) =>
                          setEndDate(newValue || getMaxDate)
                        }
                        minDate={startDate}
                        maxDate={getMaxDate()}
                      />
                    </Flex>
                  </LocalizationProvider>
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
