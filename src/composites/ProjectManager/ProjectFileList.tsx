import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton, Table, Flex, Text } from "@radix-ui/themes";
import { Version } from "../../state";
import { useState } from "react";
import { PaginationButtons } from "../../pages/Overview/Overview";
import VersionSearchBar from "./VersionSearch";
//import VersionFilters from "./Filters";

interface ProjectFileListProps {
  versions: Version[];
  invalidFiles: { name: string; reason: string }[];
  onRemoveVersion: (fileName: string) => void;
}

const ITEMS_PER_PAGE = 5;

export const ProjectFileList = ({
  versions,
  invalidFiles,
  onRemoveVersion,
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

  const [filteredVersions, setFilteredVersions] = useState<Version[]>(versions);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredVersions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const versionsToDisplay = filteredVersions.slice(startIndex, endIndex);

  const columnWidths = {
    name: "40%",
    date: "25%",
    status: "20%",
    actions: "15%",
  };

  return (
    <Flex direction="column" style={{ height: "400px" }}>
      <Flex direction="row" justify="between">
        <VersionSearchBar
          versions={versions}
          setFilteredVersions={setFilteredVersions}
        />
        {/* <VersionFilters versions={versions} /> */}
      </Flex>

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
          {versionsToDisplay.map((version) => (
            <Table.Row key={version.fileName}>
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
                >
                  <TrashIcon />
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
              <Table.Cell style={{ width: columnWidths.actions }}></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </Flex>
  );
};
