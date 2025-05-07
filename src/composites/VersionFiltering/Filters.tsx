import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <MixerHorizontalIcon width="16" height="16" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[75vh] w-[65vw] rounded-lg bg-white p-5 text-black shadow-lg">
        <ScrollArea className="h-[calc(100%-40px)]">
          <div className="flex flex-col gap-5 p-1">
            {/* Checkboxes to filter on risk level */}
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm text-gray-500">
                Filter Based on Risk Level:
              </p>
              <div className="space-y-2">
                {checkboxVals.map((val) => (
                  <div key={val} className="flex items-center space-x-2">
                    <Checkbox
                      id={`checkbox-${val}`}
                      checked={selectedFilters.includes(val)}
                      onCheckedChange={(checked) => {
                        const newSelectedFilters = checked
                          ? [...selectedFilters, val]
                          : selectedFilters.filter((item) => item !== val);
                        onFilterChange(newSelectedFilters, sliderValue);
                      }}
                    />
                    <Label htmlFor={`checkbox-${val}`}>{val}</Label>
                  </div>
                ))}
              </div>
            </div>
            {/* Slider filter */}
            <div>
              <p className="mb-2 text-sm text-gray-500">
                Filter Based on TQI Value:
              </p>
              <SliderFilter
                value={sliderValue}
                versions={versions ? versions : undefined}
                projects={projects ? projects : undefined}
                onValueChange={(newValues) =>
                  onFilterChange(selectedFilters, newValues)
                }
              />
            </div>
            {/* Reset filters */}
            <Button
              variant="secondary"
              onClick={() =>
                onFilterChange(
                  ["Severe", "High", "Elevated", "Guarded", "Low"],
                  [0, 1.0]
                )
              }
            >
              Reset Filters
            </Button>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default Filters;
