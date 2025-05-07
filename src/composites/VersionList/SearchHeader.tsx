import { SearchBar } from "../SearchBar";
import VersionFilters from "../ProjectManager/Filters/Filters";
import { useVersionList } from "./context";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverContentModal,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <PopoverAnchor>
            <Button variant="outline" className="gap-2">
              <MixerHorizontalIcon className="h-4 w-4" />
              Filters
            </Button>
          </PopoverAnchor>
        </PopoverTrigger>
        <PopoverContent>
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
    </div>
  );
};
