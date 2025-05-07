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
          overflow: "hidden",
          maxWidth: "90svw",
          width: "90svw",
          padding: 0,
          height: "80svh",
          maxHeight: "80svh"
        }}
      >
        <ProjectManager />
      </DialogContent>
    </Dialog>
  );
};
