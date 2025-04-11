import { EyeNoneIcon, EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { matchSorter } from "match-sorter";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Version } from "../../state";
import { PaginationButtons } from "./PaginationButtons";
import SearchBar from "../SearchBar";
import VersionFilters, { Filters } from "../ProjectManager/Filters/Filters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface VersionListProps {
  /** Array of version objects to display */
  versions: Version[];
  /** Array of invalid files with their error reasons */
  invalidFiles: { name: string; reason: string }[];
  /** Callback when a version is removed */
  onRemoveVersion: (fileName: string) => void;
  /** Callback when a version's visibility is toggled */
  onUpdateVersionVisibility: (fileName: string) => void;
  /** Optional custom height for the list container */
  containerHeight?: string;
  /** Optional custom items per page for pagination */
  itemsPerPage?: number;
}

const DEFAULT_ITEMS_PER_PAGE = 5;
const DEFAULT_CONTAINER_HEIGHT = "400px";

export const VersionList = ({
  versions,
  invalidFiles,
  onRemoveVersion,
  onUpdateVersionVisibility,
  containerHeight = DEFAULT_CONTAINER_HEIGHT,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: VersionListProps) => {
  // Set default date range to earliest and latest dates of versions
  const defaultDateRange: DateRange = {
    from: new Date(
      Math.min(...versions.map((v) => new Date(v.date).getTime()))
    ),
    to: new Date(Math.max(...versions.map((v) => new Date(v.date).getTime()))),
  };

  // Default filters, used to reset upon version change
  const defaultFilters: Filters = {
    date: defaultDateRange,
    visibility: ["visible", "hidden"],
    status: ["valid", "invalid"],
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [prevVersions, setPrevVersions] = useState<Version[]>(versions);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState<number>(1);

  if (!versions.length && !invalidFiles.length) {
    return (
      <Flex direction="column" align="center" justify="center" gap="4" py="9">
        <Text size="5" weight="bold" color="gray">
          No files in project
        </Text>
        <Text size="2" color="gray">
          Click "Select Files" to add files to this project
        </Text>
      </Flex>
    );
  }

  // Reset filters when versions change
  if (versions !== prevVersions) {
    setFilters(defaultFilters);
    setPrevVersions(versions);
  }

  // Apply filters dynamically
  const filteredVersions = versions.filter((v) => {
    const versionDate = new Date(v.date).getTime();

    // Check date range
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
    keys: ["*.name"],
  });

  const totalPages = Math.ceil(searchFilteredVersions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const versionsToDisplay = searchFilteredVersions.slice(startIndex, endIndex);

  const columnWidths = {
    name: "40%",
    date: "25%",
    status: "20%",
    actions: "15%",
  };

  return (
    <Flex direction="column" style={{ height: containerHeight }}>
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
      {versionsToDisplay.length === 0 &&
        (versions.length > 0 || invalidFiles.length > 0) && (
          <Flex
            direction={"column"}
            align="center"
            style={{ marginBottom: "20px" }}
          >
            <Heading mt="6" color="gray" size="5">
              No valid versions found
            </Heading>
            <Text mt="2" color="gray" size="3">
              Try changing your filters or adding more versions
            </Text>
          </Flex>
        )}
      {(versionsToDisplay.length != 0 || invalidFiles.length != 0) && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead style={{ width: columnWidths.name }}>Name</TableHead>
                <TableHead style={{ width: columnWidths.date }}>
                  Last Modified
                </TableHead>
                <TableHead style={{ width: columnWidths.status }}>
                  Status
                </TableHead>
                <TableHead style={{ width: columnWidths.actions }}>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody
              className="overflow-y-auto"
              style={{ height: `calc(${containerHeight} - 41px)` }}
            >
              {filters.status.includes("valid") &&
                versionsToDisplay.map((version) => (
                  <TableRow
                    key={version.fileName}
                    className={
                      version.isHidden ? "opacity-50 bg-neutral-100/50" : ""
                    }
                  >
                    <TableCell style={{ width: columnWidths.name }}>
                      {version.fileName}
                    </TableCell>
                    <TableCell style={{ width: columnWidths.date }}>
                      {version.date.toLocaleDateString()}
                    </TableCell>
                    <TableCell style={{ width: columnWidths.status }}>
                      Valid
                    </TableCell>
                    <TableCell style={{ width: columnWidths.actions }}>
                      <IconButton
                        size="1"
                        variant="ghost"
                        color="red"
                        onClick={() => onRemoveVersion(version.fileName)}
                        style={{ marginRight: "8px" }}
                      >
                        <TrashIcon />
                      </IconButton>
                      <IconButton
                        size="1"
                        variant="ghost"
                        color="gray"
                        onClick={() =>
                          onUpdateVersionVisibility(version.fileName)
                        }
                      >
                        {version.isHidden ? <EyeNoneIcon /> : <EyeOpenIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {invalidFiles.map((file) => (
                <TableRow key={file.name}>
                  <TableCell style={{ width: columnWidths.name }}>
                    {file.name}
                  </TableCell>
                  <TableCell style={{ width: columnWidths.date }}>-</TableCell>
                  <TableCell
                    style={{
                      width: columnWidths.status,
                      color: "var(--red-9)",
                    }}
                  >
                    {file.reason}
                  </TableCell>
                  <TableCell
                    style={{ width: columnWidths.actions }}
                  ></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {versionsToDisplay.length != 0 && (
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Flex>
  );
};
