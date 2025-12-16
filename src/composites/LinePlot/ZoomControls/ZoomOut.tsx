import { useLinePlotContext } from "../context";
import { ZoomOutIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function ZoomOut() {
  const { zoomHandlers, zoomState } = useLinePlotContext();
  const isZoomed = zoomState.zoomRange !== null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="outline" 
          onClick={zoomHandlers.zoomOut}
          disabled={!isZoomed}
        >
          <ZoomOutIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isZoomed ? "Zoom out to see full chart" : "Chart is not zoomed"}
      </TooltipContent>
    </Tooltip>
  );
}
