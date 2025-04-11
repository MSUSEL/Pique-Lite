import React from "react";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./DateRangePicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <MixerHorizontalIcon className="h-4 w-4" />
        <strong className="text-lg">Filter Files</strong>
      </div>
      <div className="space-y-2">
        <Label>Visibility</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="visible"
              checked={filters.visibility.includes("visible")}
              onCheckedChange={(checked) => {
                const newVisibility = checked
                  ? [...filters.visibility, "visible"]
                  : filters.visibility.filter((v) => v !== "visible");
                setFilters({ ...filters, visibility: newVisibility });
              }}
            />
            <Label htmlFor="visible">Visible</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hidden"
              checked={filters.visibility.includes("hidden")}
              onCheckedChange={(checked) => {
                const newVisibility = checked
                  ? [...filters.visibility, "hidden"]
                  : filters.visibility.filter((v) => v !== "hidden");
                setFilters({ ...filters, visibility: newVisibility });
              }}
            />
            <Label htmlFor="hidden">Hidden</Label>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="valid"
              checked={filters.status.includes("valid")}
              onCheckedChange={(checked) => {
                const newStatus = checked
                  ? [...filters.status, "valid"]
                  : filters.status.filter((s) => s !== "valid");
                setFilters({ ...filters, status: newStatus });
              }}
            />
            <Label htmlFor="valid">Valid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="invalid"
              checked={filters.status.includes("invalid")}
              onCheckedChange={(checked) => {
                const newStatus = checked
                  ? [...filters.status, "invalid"]
                  : filters.status.filter((s) => s !== "invalid");
                setFilters({ ...filters, status: newStatus });
              }}
            />
            <Label htmlFor="invalid">Invalid</Label>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Date</Label>
        <DateRangePicker
          date={filters.date}
          setDate={(date) =>
            setFilters({ ...filters, date: date as DateRange })
          }
        />
      </div>
      <Button
        variant="outline"
        onClick={() =>
          setFilters({
            visibility: ["visible", "hidden"],
            status: ["valid", "invalid"],
            date: defaultDate
          })
        }
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default VersionFilters;
