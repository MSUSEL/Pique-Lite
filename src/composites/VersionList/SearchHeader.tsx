import { SearchBar } from "../SearchBar";
import VersionFilters from "../ProjectManager/Filters/Filters";
import { useVersionList } from "./context";
import { ListFilter } from "lucide-react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const SearchHeader = () => {
  const {
    versions,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    defaultDateRange
  } = useVersionList();

  // Convert context filters to VersionFilters component filters
  const convertedFilters = {
    ...filters,
    date: filters.date || undefined,
    visibility: filters.visibility as string[],
    status: filters.status as string[]
  };

  return (
    <div className="SearchHeader-root flex flex-row justify-between">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hint={"versions"}
      />
      {/* {versions.length > 0 && defaultDateRange && } */}
      <Tooltip>
        <Popover modal={true}>
          <PopoverTrigger asChild>
            <PopoverAnchor>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="gap-2" size="sm">
                  <ListFilter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
            </PopoverAnchor>
          </PopoverTrigger>
          <PopoverContent className="min-w-[320px]">
            <VersionFilters
              filters={convertedFilters}
              setFilters={(newFilters) => {
                setFilters({
                  ...newFilters,
                  date: newFilters.date || undefined,
                  visibility: newFilters.visibility as ("visible" | "hidden")[],
                  status: newFilters.status as ("valid" | "invalid")[]
                });
              }}
              defaultDate={defaultDateRange}
            />
          </PopoverContent>
        </Popover>
        <TooltipContent>Filter versions by date, visibility, and status</TooltipContent>
      </Tooltip>
    </div>
  );
};
