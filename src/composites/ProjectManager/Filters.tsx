import React, { useState } from "react";
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
import DatePicker from "react-datepicker";
import { Version } from "../../state";

/* 
  Version filtering currently not in use, but will be used in future versions
*/

const VersionFilters: React.FC<{ versions: Version[] }> = ({ versions }) => {
  const [startDate, setStartDate] = useState(
    new Date(Math.min(...versions.map((v) => new Date(v.date).getTime())))
  );
  const [endDate, setEndDate] = useState(
    new Date(Math.max(...versions.map((v) => new Date(v.date).getTime())))
  );

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
              width: "20vw",
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
                  <Box>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date || startDate)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date || endDate)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </Box>
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
