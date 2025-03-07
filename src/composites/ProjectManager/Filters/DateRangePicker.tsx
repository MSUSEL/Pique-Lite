import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { DateRange, DayPicker } from "react-day-picker";
import { Button, Box } from "@radix-ui/themes";
import { Popover } from "@radix-ui/themes";
import "react-day-picker/style.css";

export function DateRangePicker({
  date,
  setDate,
  ...props
}: {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Box style={{ marginTop: "10px" }} {...props}>
      <Popover.Root>
        <Popover.Trigger>
          <Button id="date" variant={"outline"}>
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </Popover.Trigger>
        <Popover.Content
          align="start"
          style={{ maxHeight: "40vh", maxWidth: "50vw" }}
        >
          <DayPicker
            mode="range"
            showOutsideDays
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
          />
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
}
