import { Button, Dialog, Flex, Grid } from "@radix-ui/themes";
import { ProjectList } from "../../composites/ProjectManager/ProjectList";
import { ProjectFiles } from "../../composites/ProjectManager/ProjectFiles";
import { ProjectManagerProvider } from "../../composites/ProjectManager/ProjectManagerContext";
import { useSetAtom, useAtomValue } from "jotai";
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
  const setCurrentView = useSetAtom(State.currentView);
  const projects = useAtomValue(State.projects);
  const navigate = useNavigate();

  const handleContinue = () => {
    setCurrentView("overview");
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
          <Grid columns="1fr 3fr" height="100%">
            <ProjectList />
            <Flex direction="column" height="100%">
              <ProjectFiles />
              <Flex
                gap="3"
                p="4"
                justify="end"
                // style={{ borderTop: "1px solid var(--gray-6)" }}
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
          </Grid>
        </ProjectManagerProvider>
      </Dialog.Content>
    </Dialog.Root>
  );
};
