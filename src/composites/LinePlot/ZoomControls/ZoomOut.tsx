import { useLinePlotContext } from "../context";
import { ZoomOutIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export function ZoomOut() {
  const { zoomHandlers } = useLinePlotContext();

  return (
    <Button variant="outline" onClick={zoomHandlers.zoomOut}>
      <ZoomOutIcon />
    </Button>
  );
}
