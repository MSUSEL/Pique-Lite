import { useLinePlotContext, type ChartMode } from "../context";
import { ChatBubbleIcon, CropIcon } from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";

export function ModeToggle() {
  const { mode, setMode } = useLinePlotContext();

  const handleModeChange = (value: ChartMode) => {
    if (value) {
      setMode(value);
    }
  };

  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={mode}
      onValueChange={handleModeChange}
    >
      <Tooltip>
        <ToggleGroupItem value="brush">
          <TooltipTrigger asChild>
            <CropIcon />
          </TooltipTrigger>
        </ToggleGroupItem>

        <TooltipContent>
          Brush mode - Click and drag to zoom into a region
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <ToggleGroupItem value="tooltip">
          <TooltipTrigger asChild>
            <ChatBubbleIcon />
          </TooltipTrigger>
        </ToggleGroupItem>
        <TooltipContent>
          Tooltip mode - Hover over data points to see details
        </TooltipContent>
      </Tooltip>
    </ToggleGroup>
  );
}
