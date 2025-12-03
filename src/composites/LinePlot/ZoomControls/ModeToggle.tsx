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
        <TooltipTrigger asChild>
          <ToggleGroupItem value="brush">
            <CropIcon />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          Brush mode
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem value="tooltip">
            <ChatBubbleIcon />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          Tooltip mode
        </TooltipContent>
      </Tooltip>
    </ToggleGroup>
  );
}
