import React from "react";
import { Flex, SegmentedControl } from "@radix-ui/themes";
import { useLinePlotContext } from "./hooks/useLinePlotContext";
import type { ChartMode } from "./types";

interface ZoomControlsProps {
  className?: string;
}

export function ZoomControls({ className }: ZoomControlsProps) {
  const { mode, setMode, zoomHandlers } = useLinePlotContext();

  const handleModeChange = (value: ChartMode) => {
    if (value) {
      setMode(value);
    }
  };

  return (
    <Flex gap="3" align="center" className={className}>
      <SegmentedControl.Root value={mode} onValueChange={handleModeChange}>
        <SegmentedControl.Item value="brush">Brush Mode</SegmentedControl.Item>
        <SegmentedControl.Item value="tooltip">
          Tooltip Mode
        </SegmentedControl.Item>
      </SegmentedControl.Root>

      <button
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        onClick={zoomHandlers.zoomOut}
      >
        Zoom Out
      </button>
    </Flex>
  );
}
