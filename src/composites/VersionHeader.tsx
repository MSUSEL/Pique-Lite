import { Box, Flex, Button, Popover, Text, Strong } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import React from "react";
import { useMemo } from "react";
import { State } from "../state";
import { useAtom } from "jotai/react";
import { GearIcon, MagicWandIcon } from "@radix-ui/react-icons";

export const VersionHeader: React.FC = () => {
  const projectMapping = useAtomValue(State.projects);

  const projects = useMemo(() => {
    if (!projectMapping) return [];
    return Object.values(projectMapping);
  }, [projectMapping]);

  const [selectedProjectId, setSelectedProjectId] = useAtom(
    State.selectedProject
  );
  const [selectedVersion, setSelectedVersion] = useAtom(State.selectedVersion);

  const selectedProject =
    projects.find((project) => project.uuid === selectedProjectId) || null;

  const versions = useMemo(() => {
    if (!selectedProject) return [];
    return selectedProject.versions;
  }, [selectedProject]);

  return (
    <Box style={{ padding: "16px" }}>
      <Flex direction="row" width="100%" gap="6">
        <Text>
          <Strong>Project: </Strong> {selectedProject?.name}{" "}
          <Strong>Version: </Strong>
          {versions[selectedVersion].name}
        </Text>
        <Popover.Root>
          <Popover.Trigger>
            <Button variant="soft">
              <GearIcon />
            </Button>
          </Popover.Trigger>
          <Popover.Content>
            <Flex direction="column" gap="2">
              <Button variant="soft">Summary</Button>
              <Button variant="soft">
                Quick Actions <MagicWandIcon />
              </Button>
              <Button variant="soft">Sort and Filter</Button>
            </Flex>
          </Popover.Content>
        </Popover.Root>
      </Flex>
    </Box>
  );
};

export default VersionHeader;
