import { SegmentedControl } from "@radix-ui/themes";
import { useLinePlotContext, type ChartMode } from "../context";
import { ChatBubbleIcon, CropIcon } from "@radix-ui/react-icons";

export function ModeToggle() {
  const { mode, setMode } = useLinePlotContext();

  const handleModeChange = (value: ChartMode) => {
    if (value) {
      setMode(value);
    }
  };

  return (
    <SegmentedControl.Root value={mode} onValueChange={handleModeChange}>
      <SegmentedControl.Item value="brush">
        <CropIcon />
      </SegmentedControl.Item>
      <SegmentedControl.Item value="tooltip">
        <ChatBubbleIcon />
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
