import { Flex } from "@radix-ui/themes";
import SearchBar from "../SearchBar";
import VersionFilters from "../ProjectManager/Filters/Filters";
import { useVersionList } from "./context";

export const SearchHeader = () => {
  const {
    versions,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    defaultDateRange,
  } = useVersionList();

  return (
    <Flex direction="row" justify="between">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hint={"versions"}
      />
      {versions.length > 0 && (
        <VersionFilters
          filters={filters}
          setFilters={setFilters}
          defaultDate={defaultDateRange}
        />
      )}
    </Flex>
  );
};
