import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProjectManager } from "./ProjectManager";

interface ProjectManagerDialogProps {
  children: React.ReactNode;
}

export const ProjectManagerDialog = ({
  children
}: ProjectManagerDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        style={{
          maxWidth: 900,
          width: "90vw",
          padding: 0,
          height: "40vh"
        }}
      >
        <ProjectManager />
      </DialogContent>
    </Dialog>
  );
};
