import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { ProjectSidebar } from "../../composites/ProjectManager/ProjectSidebar";
import { ProjectContent } from "../../composites/ProjectManager/ProjectContent";
import { useAtomValue } from "jotai";
import { State } from "../../state";
import { useNavigate } from "react-router-dom";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface InitialProjectSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InitialProjectSetupDialog = ({
  open,
  onOpenChange
}: InitialProjectSetupDialogProps) => {
  const projects = useAtomValue(State.projects);
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/overview");
    onOpenChange(false);
  };

  return (
    <DialogContent className="InitialProjectSetupDialogRoot radius-none h-[80svh] max-h-[80svh] w-[90svw] max-w-[100svw] overflow-hidden px-0 py-0 sm:max-w-[100svw]">
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Project Manager</DialogTitle>
        </DialogHeader>
      </VisuallyHidden>
      <div className="grid max-h-[80svh] max-w-full flex-1 grid-cols-[minmax(max-content,200px)_2.5fr] overflow-hidden bg-white sm:max-h-[80svh] sm:max-w-full">
        <ProjectSidebar />
        <div className="flex flex-col justify-between gap-1">
          <div className="flex flex-1 flex-col px-4 py-8">
            <ProjectContent />
          </div>
          <div className="flex justify-end p-2">
            <Button
              onClick={handleContinue}
              disabled={!Object.keys(projects || {}).length}
              variant="secondary"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
      {/* <DialogFooter className="p-2"></DialogFooter> */}
    </DialogContent>
  );
};
