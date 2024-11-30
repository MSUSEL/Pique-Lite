import { Dialog } from "@radix-ui/themes";
import { ProjectManager } from "./ProjectManager";

interface ProjectManagerDialogProps {
  children: React.ReactNode;
}

export const ProjectManagerDialog = ({
  children,
}: ProjectManagerDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content
        style={{
          maxWidth: 900,
          width: "90vw",
          padding: 0,
          height: "40vh",
        }}
      >
        <ProjectManager />
      </Dialog.Content>
    </Dialog.Root>
  );
};
