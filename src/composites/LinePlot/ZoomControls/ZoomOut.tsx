import { IconButton } from "@radix-ui/themes";
import { useLinePlotContext } from "../context";
import { ZoomOutIcon } from "@radix-ui/react-icons";

export function ZoomOut() {
  const { zoomHandlers } = useLinePlotContext();

  return (
    <IconButton
      size="2"
      variant="surface"
      color="gray"
      onClick={zoomHandlers.zoomOut}
    >
      <ZoomOutIcon />
    </IconButton>
  );
}
