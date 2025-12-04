import { useLinePlotContext } from "../context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";

export function ModeToggle() {
  const { mode, setMode } = useLinePlotContext();

  const handleCheckedChange = (checked: boolean) => {
    setMode(checked ? "brush" : "tooltip");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center gap-2">
          <Switch
            id="brush-mode"
            checked={mode === "brush"}
            onCheckedChange={handleCheckedChange}
          />
          <Label htmlFor="brush-mode" className="text-sm cursor-pointer">
            Brush Mode
          </Label>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {mode === "brush"
          ? "Toggle to switch to tooltip mode"
          : "Toggle to enable brush selection"}
      </TooltipContent>
    </Tooltip>
  );
}
