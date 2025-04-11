import { useLinePlotContext, type ChartMode } from "../context";
import { ChatBubbleIcon, CropIcon } from "@radix-ui/react-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
      <ToggleGroupItem value="brush">
        <CropIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="tooltip">
        <ChatBubbleIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
