import { TrashIcon, EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { IconButton, Table, Flex, Text, Heading } from "@radix-ui/themes";
import { Version } from "../../state";
import { useState } from "react";
import { PaginationButtons } from "../Combobox/PaginationButtons";
import SearchBar from "../SearchBar";
import VersionFilters, { Filters } from "./Filters/Filters";
import { matchSorter } from "match-sorter";
import { DateRange } from "react-day-picker";

interface ProjectFileListProps {
  versions: Version[];
  invalidFiles: { name: string; reason: string }[];
  onRemoveVersion: (fileName: string) => void;
  onUpdateVersionVisibility: (fileName: string) => void;
}

const ITEMS_PER_PAGE = 5;

export const ProjectFileList = ({
  versions,
  invalidFiles,
  onRemoveVersion,
  onUpdateVersionVisibility,
}: ProjectFileListProps) => {
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

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [prevVersions, setPrevVersions] = useState<Version[]>(versions);

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

  const [filters, setFilters] = useState<Filters>(defaultFilters);

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(searchFilteredVersions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const versionsToDisplay = searchFilteredVersions.slice(startIndex, endIndex);

  const columnWidths = {
    name: "40%",
    date: "25%",
    status: "20%",
    actions: "15%",
  };

  return (
    <Flex direction="column" style={{ height: "400px" }}>
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
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell style={{ width: columnWidths.name }}>
                Name
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: columnWidths.date }}>
                Last Modified
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: columnWidths.status }}>
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell style={{ width: columnWidths.actions }}>
                Actions
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body
            style={{ overflow: "scroll", height: "calc(400px - 41px)" }}
          >
            {filters.status.includes("valid") &&
              versionsToDisplay.map((version) => (
                <Table.Row
                  key={version.fileName}
                  style={{
                    opacity: version.isHidden ? 0.5 : 1, // Conditional opacity
                    backgroundColor: version.isHidden
                      ? "#f9f9f9"
                      : "transparent", // Conditional background
                  }}
                >
                  <Table.Cell style={{ width: columnWidths.name }}>
                    {version.fileName}
                  </Table.Cell>
                  <Table.Cell style={{ width: columnWidths.date }}>
                    {version.date.toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell style={{ width: columnWidths.status }}>
                    Valid
                  </Table.Cell>
                  <Table.Cell style={{ width: columnWidths.actions }}>
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
                  </Table.Cell>
                </Table.Row>
              ))}
            {invalidFiles.map((file) => (
              <Table.Row key={file.name}>
                <Table.Cell style={{ width: columnWidths.name }}>
                  {file.name}
                </Table.Cell>
                <Table.Cell style={{ width: columnWidths.date }}>-</Table.Cell>
                <Table.Cell
                  style={{
                    width: columnWidths.status,
                    color: "var(--red-9)",
                  }}
                >
                  {file.reason}
                </Table.Cell>
                <Table.Cell
                  style={{ width: columnWidths.actions }}
                ></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
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
