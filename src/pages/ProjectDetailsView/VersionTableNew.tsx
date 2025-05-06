import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  HeaderContext,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../composites/DataTable.tsx";
import { Version } from "src/state/core.ts";
import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Link } from "react-router-dom";

interface FlatVersion extends Omit<Version, "data"> {
  availability: number;
  authenticity: number;
  authorization: number;
  confidentiality: number;
  non_repudiation: number;
  integrity: number;
  projectId: string;
}

// Context for sharing flat versions
interface ProjectVersionsContextValue {
  flatVersions: FlatVersion[];
}
const ProjectVersionsContext = createContext<
  ProjectVersionsContextValue | undefined
>(undefined);

interface ProjectVersionsProviderProps {
  projectId: string;
  versions: Version[];
  children: ReactNode;
}
export function ProjectVersionsProvider({
  projectId,
  versions,
  children
}: ProjectVersionsProviderProps) {
  console.error(`(VERSIONSTABLE) projectId: ${projectId}`);
  const flatVersions: FlatVersion[] = useMemo(() => {
    return versions.map((version) => {
      const obj = {
        name: version.name,
        tqi: version.data.value,
        date: version.date,
        isHidden: version.isHidden,
        fileName: version.fileName,
        versionId: version.versionId,
        projectId: projectId
      };
      for (const child of version.data.children) {
        // @ts-expect-error - Dynamic key assignment based on child name
        obj[child.name.toLowerCase().replace("-", "_")] = child.value;
      }
      return obj as unknown as FlatVersion;
    });
  }, [versions, projectId]);

  return (
    <ProjectVersionsContext.Provider value={{ flatVersions }}>
      {children}
    </ProjectVersionsContext.Provider>
  );
}

const METRIC_NAME_MAPPING = {
  tqi: "TQI",
  availability: "Availability",
  authenticity: "Authenticity",
  authorization: "Authorization",
  confidentiality: "Confidentiality",
  non_repudiation: "Non-Repudiation",
  integrity: "Integrity"
};

// Define columns with sorting enabled
const columns: ColumnDef<FlatVersion>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        Version
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link
        to={`/versionDetails/project/${row.original.projectId}/version/${row.original.versionId}`}
      >
        {row.getValue("name")}
      </Link>
    ),
    size: 100 // w-[100px] equivalent
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="p-0 hover:bg-transparent"
      >
        Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      return <div>{date.toLocaleDateString()}</div>;
    }
  },
  ...Object.keys(METRIC_NAME_MAPPING).map((metricName) => {
    return {
      accessorKey: metricName,
      header: ({ column }: HeaderContext<FlatVersion, unknown>) => (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            {
              // @ts-expect-error - METRIC_NAME_MAPPING is indexed by string keys
              METRIC_NAME_MAPPING[metricName]
            }
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }: CellContext<FlatVersion, number>) => {
        // Use nested accessor to get the data.value
        console.log(row);
        // Explicitly cast the value to number before calling toFixed
        const value = row.getValue(metricName) as number;
        return <div className="text-right">{value.toFixed(2)}</div>;
      }
    };
  })
];

export function ProjectVersionsTable() {
  // Consume context directly
  const context = useContext(ProjectVersionsContext);
  if (!context) {
    throw new Error(
      "ProjectVersionsTable must be used within a ProjectVersionsProvider"
    );
  }
  const { flatVersions } = context;

  const table = useReactTable({
    data: flatVersions,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return <DataTable table={table} />;
}
