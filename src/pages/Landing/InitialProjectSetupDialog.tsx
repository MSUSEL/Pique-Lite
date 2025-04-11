import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
    <DialogContent className="max-w-[1200px] px-0 py-0 sm:max-w-[1200px]">
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Project Manager</DialogTitle>
        </DialogHeader>
      </VisuallyHidden>
      <div className="">
        <div className="grid flex-1 grid-cols-[1fr_3fr]">
          <ProjectSidebar />
          <ProjectContent />
        </div>
        <div className="border-border flex justify-end gap-3 border-t p-4">
          <Button
            onClick={handleContinue}
            disabled={!Object.keys(projects || {}).length}
          >
            Continue
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
