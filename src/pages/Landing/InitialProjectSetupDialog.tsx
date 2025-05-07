import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAtomValue } from "jotai";
import { ProjectContent } from "../../composites/ProjectManager/ProjectContent";
import { ProjectManagerProvider } from "../../composites/ProjectManager/ProjectManagerContext";
import { ProjectSidebar } from "../../composites/ProjectManager/ProjectSidebar";
import { State } from "../../state";

interface InitialProjectSetupDialogProps {
  trigger: React.ReactNode;
  triggerAsChild?: boolean;
  onContinue: () => void;
}

export const InitialProjectSetupDialog = ({
  onContinue,
  trigger,
  triggerAsChild = false
}: InitialProjectSetupDialogProps) => {
  const projects = useAtomValue(State.projects);

  return (
    <ProjectManagerProvider>
      <Dialog>
        <DialogTrigger asChild={triggerAsChild}>{trigger}</DialogTrigger>
        <DialogContent className="max-h-[60svh] max-w-[80svw] px-0 py-0 sm:max-h-[60svh] sm:max-w-[80svw]">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>Project Manager</DialogTitle>
            </DialogHeader>
          </VisuallyHidden>
          <div className="grid h-[60svh] max-h-[60svh] max-w-[80svw] grid-cols-[1fr_3fr] overflow-hidden sm:max-h-[60svh] sm:max-w-[80svw]">
            <ProjectSidebar />
            <div className="grid h-[60svh] max-h-[60svh] max-w-[80svw] grid-rows-[1fr_max-content] overflow-hidden p-4 sm:max-h-[60svh] sm:max-w-[80svw]">
              <ProjectContent />
              <div className="flex justify-end">
                <Button
                  onClick={onContinue}
                  disabled={!Object.keys(projects || {}).length}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ProjectManagerProvider>
  );
};
