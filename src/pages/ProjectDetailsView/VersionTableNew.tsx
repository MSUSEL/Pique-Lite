import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  HeaderContext,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../composites/DataTable.tsx";
import { Version } from "src/state/core.ts";
import React, { createContext, useContext, useMemo, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface FlatVersion extends Omit<Version, "data"> {
  tqi: number;
  projectId: string;
  [key: string]: any; // Dynamic characteristics
}

// Context for sharing flat versions and characteristic names
interface ProjectVersionsContextValue {
  flatVersions: FlatVersion[];
  characteristicNames: string[];
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

  // Extract unique characteristic names from the versions
  const characteristicNames = useMemo(() => {
    if (versions.length === 0) return [];

    // Get all unique characteristic names from all versions
    const namesSet = new Set<string>();
    versions.forEach(version => {
      version.data.children.forEach(child => {
        namesSet.add(child.name);
      });
    });

    // Convert to array and sort (ensure TQI is last if present)
    return Array.from(namesSet).sort((a, b) => {
      if (a.toLowerCase() === 'tqi') return 1;
      if (b.toLowerCase() === 'tqi') return -1;
      return a.localeCompare(b);
    });
  }, [versions]);

  return (
    <ProjectVersionsContext.Provider value={{ flatVersions, characteristicNames }}>
      {children}
    </ProjectVersionsContext.Provider>
  );
}

// Helper function to create dynamic columns based on characteristic names
const createColumns = (characteristicNames: string[]): ColumnDef<FlatVersion>[] => {
  const baseColumns: ColumnDef<FlatVersion>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Version
            {isSorted === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
            {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
            {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link
          to={`/versionDetails/project/${row.original.projectId}/version/${row.original.versionId}`}
        >
          {row.getValue("name")}
        </Link>
      ),
      size: 100
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Date
            {isSorted === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
            {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
            {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue("date") as Date;
        return <div>{date.toLocaleDateString()}</div>;
      }
    }
  ];

  // Add TQI column first
  const tqiColumn: ColumnDef<FlatVersion> = {
    accessorKey: "tqi",
    header: ({ column }: HeaderContext<FlatVersion, unknown>) => {
      const isSorted = column.getIsSorted();
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            TQI
            {isSorted === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
            {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
            {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      );
    },
    cell: ({ row }: CellContext<FlatVersion, number>) => {
      const raw = row.getValue("tqi");
      const value = typeof raw === "number" ? raw : Number(raw);
      const display = Number.isFinite(value) ? value.toFixed(2) : "—";
      return <div className="text-right">{display}</div>;
    }
  };

  // Create columns for each characteristic
  const characteristicColumns: ColumnDef<FlatVersion>[] = characteristicNames.map((charName) => {
    const accessorKey = charName.toLowerCase().replace("-", "_");
    return {
      accessorKey,
      header: ({ column }: HeaderContext<FlatVersion, unknown>) => {
        const isSorted = column.getIsSorted();
        return (
          <div className="text-right">
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="p-0 hover:bg-transparent"
            >
              {charName}
              {isSorted === false && <ArrowUpDown className="ml-2 h-4 w-4" />}
              {isSorted === "asc" && <ArrowUp className="ml-2 h-4 w-4" />}
              {isSorted === "desc" && <ArrowDown className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        );
      },
      cell: ({ row }: CellContext<FlatVersion, number>) => {
        const raw = row.getValue(accessorKey);
        const value = typeof raw === "number" ? raw : Number(raw);
        const display = Number.isFinite(value) ? value.toFixed(2) : "—";
        return <div className="text-right">{display}</div>;
      }
    };
  });

  return [...baseColumns, tqiColumn, ...characteristicColumns];
};

export function ProjectVersionsTable() {
  // Consume context directly
  const context = useContext(ProjectVersionsContext);
  if (!context) {
    throw new Error(
      "ProjectVersionsTable must be used within a ProjectVersionsProvider"
    );
  }
  const { flatVersions, characteristicNames } = context;

  const [sorting, setSorting] = useState<SortingState>([]);

  // Generate columns dynamically based on characteristics
  const columns = useMemo(() => createColumns(characteristicNames), [characteristicNames]);

  const table = useReactTable({
    data: flatVersions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    }
  });
  return <DataTable table={table} />;
}
