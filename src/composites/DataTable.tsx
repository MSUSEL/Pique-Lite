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
  flexRender,
  useReactTable,
  Table as TanstackTable
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

//------------------------------------------------------------------------------
// Component Props
//------------------------------------------------------------------------------

interface DataTableProps<TData> {
  table: TanstackTable<TData>;
}

//------------------------------------------------------------------------------
// Main DataTable Component
//------------------------------------------------------------------------------

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                No results.
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
