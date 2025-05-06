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
    <DialogContent className="h-[800px] max-w-[800px] px-0 py-0 sm:max-w-[800px]">
      <VisuallyHidden>
        <DialogHeader>
          <DialogTitle>Project Manager</DialogTitle>
        </DialogHeader>
      </VisuallyHidden>
      <div className="h-800px w-800px grid grid-cols-[1fr_3fr]">
        <ProjectSidebar />
        <ProjectContent />
      </div>
      <DialogFooter>
        <Button
          onClick={handleContinue}
          disabled={!Object.keys(projects || {}).length}
        >
          Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
