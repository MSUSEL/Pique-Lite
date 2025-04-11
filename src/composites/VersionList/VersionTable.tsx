import { EyeNoneIcon, EyeOpenIcon, TrashIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVersionList } from "./context";

const columnWidths = {
  name: "40%",
  date: "25%",
  status: "20%",
  actions: "15%",
};

export const VersionTable = () => {
  const {
    versions,
    invalidFiles,
    versionsToDisplay,
    filters,
    onRemoveVersion,
    onUpdateVersionVisibility,
  } = useVersionList();

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

  if (
    versionsToDisplay.length === 0 &&
    versions.length > 0 &&
    filters.status.includes("valid")
  ) {
    return (
      <Flex direction="column" align="center" style={{ marginBottom: "20px" }}>
        <Heading mt="6" color="gray" size="5">
          No valid versions found
        </Heading>
        <Text mt="2" color="gray" size="3">
          Try changing your filters or adding more versions
        </Text>
      </Flex>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="max-h-[calc(100vh-300px)] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow className="hover:bg-transparent">
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
          <TableBody>
            {filters.status.includes("valid") &&
              versionsToDisplay.map((version) => (
                <TableRow
                  key={version.versionId}
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
              <TableRow key={`invalid-${file.name}`}>
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
                <TableCell style={{ width: columnWidths.actions }}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
