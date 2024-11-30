import { Button, Dialog, Flex } from "@radix-ui/themes";
import { ProjectManager } from "../composites/ProjectManager/ProjectManager";
import { useSetAtom, useAtomValue } from "jotai";
import { State } from "../state/core";

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

  const handleContinue = () => {
    setCurrentView("overview");
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        style={{
          maxWidth: 900,
          width: "90vw",
          padding: 0,
          // paddingBottom: "1rem",
        }}
      >
        <ProjectManager />

        <Flex gap="3" m="1" justify="end">
          <Button
            size="3"
            variant="solid"
            onClick={handleContinue}
            disabled={!Object.keys(projects || {}).length}
          >
            Continue
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
