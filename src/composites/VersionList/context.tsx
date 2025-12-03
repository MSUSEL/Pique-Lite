import { createContext, useContext, useState, useEffect } from "react";
import { Version } from "../../state";
import { DateRange } from "react-day-picker";
import { matchSorter } from "match-sorter";

export interface Filters {
  date: DateRange | undefined;
  visibility: ("visible" | "hidden")[];
  status: ("valid" | "invalid")[];
}

interface VersionListContextType {
  versions: Version[];
  invalidFiles: { name: string; reason: string }[];
  onRemoveVersion: (fileName: string) => void;
  onRemoveInvalidFile: (fileName: string) => void;
  onUpdateVersionVisibility: (fileName: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  filteredVersions: Version[];
  versionsToDisplay: Version[];
  totalPages: number;
  defaultDateRange: DateRange | undefined;
}

const VersionListContext = createContext<VersionListContextType | null>(null);

interface VersionListProviderProps {
  children: React.ReactNode;
  versions: Version[];
  invalidFiles: { name: string; reason: string }[];
  onRemoveVersion: (fileName: string) => void;
  onRemoveInvalidFile?: (fileName: string) => void;
  onUpdateVersionVisibility: (fileName: string) => void;
  itemsPerPage?: number;
}

export const VersionListProvider = ({
  children,
  versions,
  invalidFiles,
  onRemoveVersion,
  onRemoveInvalidFile,
  onUpdateVersionVisibility,
  itemsPerPage = 20,
}: VersionListProviderProps) => {
  // Set default date range only if we have versions
  const defaultDateRange = versions.length
    ? {
        from: new Date(
          Math.min(...versions.map((v) => new Date(v.date).getTime()))
        ),
        to: new Date(
          Math.max(...versions.map((v) => new Date(v.date).getTime()))
        ),
      }
    : undefined;

  // Default filters - start with everything visible
  const defaultFilters: Filters = {
    date: defaultDateRange,
    visibility: ["visible", "hidden"],
    status: ["valid", "invalid"],
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Apply filters dynamically
  const filteredVersions = versions.filter((v) => {
    const versionDate = new Date(v.date).getTime();

    const isInDateRange =
      !filters.date ||
      ((!filters.date.from ||
        versionDate >= new Date(filters.date.from).getTime()) &&
        (!filters.date.to ||
          versionDate <= new Date(filters.date.to).getTime()));

    const matchesVisibility =
      (v.isHidden && filters.visibility.includes("hidden")) ||
      (!v.isHidden && filters.visibility.includes("visible"));

    return isInDateRange && matchesVisibility;
  });

  const searchFilteredVersions = matchSorter(filteredVersions, searchQuery, {
    keys: ["fileName"],
  });

  const totalPages = Math.ceil(searchFilteredVersions.length / itemsPerPage);

  // Reset to page 1 when filtered results change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, versions.length]);

  // Ensure current page is valid
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const versionsToDisplay = searchFilteredVersions.slice(startIndex, endIndex);

  return (
    <VersionListContext.Provider
      value={{
        versions,
        invalidFiles,
        onRemoveVersion,
        onRemoveInvalidFile: onRemoveInvalidFile || (() => {}),
        onUpdateVersionVisibility,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        currentPage,
        setCurrentPage,
        filteredVersions: searchFilteredVersions,
        versionsToDisplay,
        totalPages,
        defaultDateRange,
      }}
    >
      {children}
    </VersionListContext.Provider>
  );
};

export const useVersionList = () => {
  const context = useContext(VersionListContext);
  if (!context) {
    throw new Error("useVersionList must be used within a VersionListProvider");
  }
  return context;
};
