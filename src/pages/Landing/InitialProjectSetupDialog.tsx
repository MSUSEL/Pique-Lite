import { Button, Dialog, Flex, Grid } from "@radix-ui/themes";
import { ProjectSidebar } from "../../composites/ProjectManager/ProjectSidebar";
import { ProjectContent } from "../../composites/ProjectManager/ProjectContent";
import { ProjectManagerProvider } from "../../composites/ProjectManager/ProjectManagerContext";
import { useAtomValue } from "jotai";
import { State } from "../../state";
import { useNavigate } from "react-router-dom";

interface InitialProjectSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InitialProjectSetupDialog = ({
  open,
  onOpenChange,
}: InitialProjectSetupDialogProps) => {
  const projects = useAtomValue(State.projects);
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/overview");
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        style={{
          maxWidth: 900,
          width: "90vw",
          padding: 0,
          height: "80vh",
        }}
      >
        <ProjectManagerProvider>
          <Flex direction="column" height="100%">
            <Grid columns="1fr 3fr" style={{ flex: 1 }}>
              <ProjectSidebar />
              <ProjectContent />
            </Grid>
            <Flex
              gap="3"
              p="4"
              justify="end"
              style={{ borderTop: "1px solid var(--gray-6)" }}
            >
              <Button
                size="3"
                variant="solid"
                onClick={handleContinue}
                disabled={!Object.keys(projects || {}).length}
              >
                Continue
              </Button>
            </Flex>
          </Flex>
        </ProjectManagerProvider>
      </Dialog.Content>
    </Dialog.Root>
  );
};
