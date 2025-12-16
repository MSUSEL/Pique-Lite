import React from "react";
import { useLinePlotContext, type BrushSelection } from "./context";

interface BrushStatsProps<T> {
  children: (selection: BrushSelection<T>) => React.ReactNode;
  fallback?: React.ReactNode;
}

const DefaultFallback = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      gap: "0.5rem",
    }}
  >
    <div
      style={{ fontSize: "1.25rem", fontWeight: 500, color: "var(--gray-11)" }}
    >
      No selection active
    </div>
    <div style={{ fontSize: "0.875rem", color: "var(--gray-9)" }}>
      Use brush mode to select a region
    </div>
  </div>
);

export function BrushStats<T extends { date: string | Date }>({
  children,
  fallback = <DefaultFallback />,
}: BrushStatsProps<T>) {
  const { currentSelection } = useLinePlotContext<T>();

  if (!currentSelection) {
    return <>{fallback}</>;
  }

  const fromDate = new Date(
    currentSelection.start.date as string
  ).toLocaleDateString();
  const toDate = new Date(
    currentSelection.end.date as string
  ).toLocaleDateString();

  return (
    <div>
      <div
        style={{
          fontSize: "1rem",
          fontWeight: 500,
          color: "var(--gray-12)",
          marginBottom: "1rem",
        }}
      >
        Selection: {fromDate} - {toDate}
      </div>
      {children(currentSelection)}
    </div>
  );
}
