"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

//------------------------------------------------------------------------------
// Component Props
//------------------------------------------------------------------------------

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // New filtering props (using TanStack Table's built-in filtering)
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  // Row actions
  rowActions?: (row: TData) => React.ReactNode;
  // Styling
  getRowStyles?: (row: TData) => React.CSSProperties | string | undefined;
  // Empty state
  emptyStateMessage?: string;
  noMatchingDataMessage?: string;
}

//------------------------------------------------------------------------------
// Main DataTable Component
//------------------------------------------------------------------------------

export function DataTable<TData, TValue>({
  columns,
  data,
  columnFilters: externalColumnFilters,
  onColumnFiltersChange,
  rowActions,
  getRowStyles,
  emptyStateMessage = "No data available.",
  noMatchingDataMessage = "No matching results."
}: DataTableProps<TData, TValue>) {
  // Internal state for sorting and filtering
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    externalColumnFilters || []
  );

  // Handle filter state changes
  const handleColumnFiltersChange = (filters: ColumnFiltersState) => {
    setColumnFilters(filters);
    if (onColumnFiltersChange) {
      onColumnFiltersChange(filters);
    }
  };

  // Sync with external filters when they change
  React.useEffect(() => {
    if (externalColumnFilters) {
      setColumnFilters(externalColumnFilters);
    }
  }, [externalColumnFilters]);

  // Add rowActions column if provided
  const columnsWithActions = React.useMemo(() => {
    if (!rowActions) return columns;

    return [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => rowActions(row.original)
      }
    ] as ColumnDef<TData, TValue>[];
  }, [columns, rowActions]);

  // Initialize TanStack Table
  const table = useReactTable({
    data,
    columns: columnsWithActions,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: handleColumnFiltersChange,
    state: {
      sorting,
      columnFilters: externalColumnFilters || columnFilters
    }
  });

  // Check if data is empty
  const isDataEmpty = data.length === 0;
  const isFilteredDataEmpty =
    table.getRowModel().rows.length === 0 && !isDataEmpty;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              // Apply custom row styles if provided
              const customStyles = getRowStyles
                ? getRowStyles(row.original)
                : undefined;
              const rowClassName =
                typeof customStyles === "string" ? customStyles : "";
              const rowStyle =
                typeof customStyles === "object" ? customStyles : undefined;

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  style={rowStyle}
                  className={rowClassName}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {isFilteredDataEmpty
                  ? noMatchingDataMessage
                  : emptyStateMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

//------------------------------------------------------------------------------
// Column Helpers - Enhanced with better sorting indicators
//------------------------------------------------------------------------------

// Helper function to create sortable column headers with better indicators
export function createSortableColumn<T>(
  accessorKey: keyof T,
  header: string,
  alignment: "left" | "right" | "center" = "left"
): ColumnDef<T> {
  return {
    accessorKey: accessorKey as string,
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === "asc")}
          className={`flex items-center gap-1 p-0 hover:bg-transparent ${
            alignment === "right" ? "ml-auto" : ""
          }`}
        >
          {header}
          {isSorted === false && <ArrowUpDown className="h-4 w-4" />}
          {isSorted === "asc" && <ArrowUp className="h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue(accessorKey as string);
      return <div className={`text-${alignment}`}>{value}</div>;
    }
  };
}

// Example of a formatter for currency values
export function createCurrencyColumn<T>(
  accessorKey: keyof T,
  header: string,
  currency: string = "USD"
): ColumnDef<T> {
  return {
    accessorKey: accessorKey as string,
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isSorted === "asc")}
            className="ml-auto flex items-center gap-1 p-0 hover:bg-transparent"
          >
            {header}
            {isSorted === false && <ArrowUpDown className="h-4 w-4" />}
            {isSorted === "asc" && <ArrowUp className="h-4 w-4" />}
            {isSorted === "desc" && <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue(accessorKey as string));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    }
  };
}

// Example of a formatter for status badges
export function createStatusColumn<T>(
  accessorKey: keyof T,
  header: string,
  statusStyles: Record<string, string>
): ColumnDef<T> {
  return {
    accessorKey: accessorKey as string,
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === "asc")}
          className="flex items-center gap-1 p-0 hover:bg-transparent"
        >
          {header}
          {isSorted === false && <ArrowUpDown className="h-4 w-4" />}
          {isSorted === "asc" && <ArrowUp className="h-4 w-4" />}
          {isSorted === "desc" && <ArrowDown className="h-4 w-4" />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue(accessorKey as string) as string;
      const statusStyle = statusStyles[status] || "bg-gray-100 text-gray-800";

      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyle}`}
        >
          {status}
        </div>
      );
    }
  };
}

//------------------------------------------------------------------------------
// Filtering Helpers
//------------------------------------------------------------------------------

// Helper function to create a filter for a specific column
export function setColumnFilter<TData>(
  table: ReturnType<typeof useReactTable<TData>>,
  columnId: string,
  value: string
) {
  table.getColumn(columnId)?.setFilterValue(value);
}

// Create a text filter input connected to a table column
export function createTextFilter<TData>(
  table: ReturnType<typeof useReactTable<TData>>,
  columnId: string,
  placeholder: string = "Filter...",
  className: string = "max-w-sm"
) {
  const column = table.getColumn(columnId);
  if (!column) return null;

  return (
    <input
      className={`rounded border px-2 py-1 ${className}`}
      placeholder={placeholder}
      value={(column.getFilterValue() as string) ?? ""}
      onChange={(e) => column.setFilterValue(e.target.value)}
    />
  );
}

//------------------------------------------------------------------------------
// Row Actions
//------------------------------------------------------------------------------

export type ActionItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
};

interface RowActionsProps {
  actions: ActionItem[];
  label?: string;
}

export function RowActions({ actions, label = "Actions" }: RowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick();
            }}
            disabled={action.disabled}
            className="flex items-center gap-2"
          >
            {action.icon && <span className="h-4 w-4">{action.icon}</span>}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

//------------------------------------------------------------------------------
// Usage Examples
//------------------------------------------------------------------------------

// Example: How to use column filters
/*
  // In your component:
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "status", value: "active" }
  ]);

  // Pass to DataTable:
  <DataTable
    columns={columns}
    data={data}
    columnFilters={columnFilters}
    onColumnFiltersChange={setColumnFilters}
  />

  // Using filter inputs in your UI
  const table = useReactTable({...});
  
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {createTextFilter(table, "name", "Filter by name...")}
        {createTextFilter(table, "email", "Filter by email...")}
      </div>
      <DataTable table={table} />
    </div>
  )
*/

// Example: How to use custom row styling
/*
  <DataTable
    columns={columns}
    data={data}
    getRowStyles={(row) => {
      // Return CSS properties object
      if (row.status === "failed") {
        return { backgroundColor: "rgba(239, 68, 68, 0.1)" };
      }
      // Or return a className string
      if (row.status === "processing") {
        return "bg-blue-50";
      }
      return undefined;
    }}
  />
*/
