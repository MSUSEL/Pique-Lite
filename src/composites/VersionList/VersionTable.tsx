import { AlertCircle, Eye, EyeOff, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    onRemoveInvalidFile,
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
              <TableCell
                style={{ width: columnWidths.name }}
                className="text-xs"
              >
                {version.fileName}
              </TableCell>
              <TableCell
                style={{ width: columnWidths.date }}
                className="text-xs"
              >
                {version.date.toLocaleDateString()}
              </TableCell>
              <TableCell
                className="text-xs"
                style={{ width: columnWidths.status }}
              >
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
                    <EyeOff className="h-2 w-2" />
                  ) : (
                    <Eye className="h-2 w-2" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        {invalidFiles.map((file) => {
          return (
            <TableRow key={`invalid-${file.name}`} className="bg-red-50 border-l-4 border-l-red-500">
              <TableCell style={{ width: columnWidths.name }} className="text-xs">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>{file.name}</span>
                </div>
              </TableCell>
              <TableCell style={{ width: columnWidths.date }} className="text-xs">-</TableCell>
              <TableCell
                className="text-xs text-red-600"
                style={{ width: columnWidths.status }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help underline decoration-dotted">Invalid format</span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-lg">
                      <div className="flex flex-col gap-2">
                        <p className="text-xs whitespace-pre-wrap break-words">{file.reason}</p>
                        <a
                          href="https://msusel.github.io/Pique-Lite/user-guide/input-schema/input-errors"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:text-blue-600 underline"
                        >
                          Learn how to fix this error →
                        </a>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell style={{ width: columnWidths.actions }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => onRemoveInvalidFile(file.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
