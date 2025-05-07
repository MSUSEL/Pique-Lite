import { Eye, EyeOff, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useVersionList } from "./context";

const columnWidths = {
  name: "40%",
  date: "25%",
  status: "20%",
  actions: "15%"
};

export const VersionTable = () => {
  const {
    versions,
    invalidFiles,
    versionsToDisplay,
    filters,
    onRemoveVersion,
    onUpdateVersionVisibility
  } = useVersionList();

  if (!versions.length && !invalidFiles.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-9">
        <h2 className="text-lg font-bold text-gray-500">No files in project</h2>
        <p className="text-sm text-gray-500">
          Click "Select Files" to add files to this project
        </p>
      </div>
    );
  }

  if (
    versionsToDisplay.length === 0 &&
    versions.length > 0 &&
    filters.status.includes("valid")
  ) {
    return (
      <div className="mb-5 flex flex-col items-center">
        <h2 className="mt-6 text-lg font-semibold text-gray-500">
          No valid versions found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Try changing your filters or adding more versions
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader className="sticky top-0 z-10 bg-white">
        <TableRow className="hover:bg-transparent">
          <TableHead style={{ width: columnWidths.name }}>Name</TableHead>
          <TableHead style={{ width: columnWidths.date }}>
            Last Modified
          </TableHead>
          <TableHead style={{ width: columnWidths.status }}>Status</TableHead>
          <TableHead style={{ width: columnWidths.actions }}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filters.status.includes("valid") &&
          versionsToDisplay.map((version) => (
            <TableRow
              key={version.fileName}
              className={version.isHidden ? "bg-neutral-100/50 opacity-50" : ""}
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => onRemoveVersion(version.fileName)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onUpdateVersionVisibility(version.fileName)}
                >
                  {version.isHidden ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
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
                color: "var(--red-9)"
              }}
            >
              {file.reason}
            </TableCell>
            <TableCell style={{ width: columnWidths.actions }}></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
