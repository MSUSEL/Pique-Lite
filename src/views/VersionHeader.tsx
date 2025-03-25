import { Box, Flex } from "@radix-ui/themes";
import { LabelledComboBox } from "../composites/Combobox";
import { useAtomValue } from "jotai";
import React from "react";
import { useMemo } from "react";
import { State } from "../state";
import { useAtom } from "jotai/react";

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
        <LabelledComboBox
          label="Project"
          getOptionKey={(project) => project.uuid}
          getOptionLabel={(project) => project.name}
          options={projects}
          value={selectedProject}
          onChange={(project) => setSelectedProjectId(project?.uuid || "")}
        />
        <LabelledComboBox
          label="Version"
          options={versions}
          value={versions[selectedVersion as number]! || undefined}
          getOptionKey={(version) => version.name}
          getOptionLabel={(version) => version.name}
          onChange={(version) =>
            setSelectedVersion(version ? versions.indexOf(version) : undefined)
          }
        />
      </Flex>
    </Box>
  );
};

export default VersionHeader;
