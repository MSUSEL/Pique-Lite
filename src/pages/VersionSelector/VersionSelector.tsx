import { Box } from "@radix-ui/themes";
import { VersionCards } from "./VersionCards";
import React, { useMemo } from "react";
import { State } from "../../state";
import { LabelledComboBox } from "../../composites/Combobox";
import { useAtom, useSetAtom, useAtomValue } from "jotai";

export const VersionSelector: React.FC = () => {
  const projectMapping = useAtomValue(State.projects);

  const setCurrentView = useSetAtom(State.currentView);
  const setVersion = useSetAtom(State.selectedVersion);
  const setSelectedProjectId = useSetAtom(State.selectedProject);

  const projects = useMemo(() => {
    if (!projectMapping) return [];
    return Object.values(projectMapping);
  }, [projectMapping]);

  const [selectedProjectId] = useAtom(State.selectedProject);

  const selectedProject =
    projects.find((project) => project.uuid === selectedProjectId) || null;

  const versions = useMemo(() => {
    if (!selectedProject) return [];
    return selectedProject.versions;
  }, [selectedProject]);

  return (
    <Box>
      <LabelledComboBox
        label="Project"
        getOptionKey={(project) => project.uuid}
        getOptionLabel={(project) => project.name}
        options={projects}
        value={selectedProject}
        onChange={(project) => setSelectedProjectId(project?.uuid || "")}
      />
      <VersionCards
        versions={versions}
        onVersionClick={(versionIndex) => {
          setCurrentView("versionoverview");
          setVersion(versionIndex);
        }}
      />
    </Box>
  );
};

export default VersionSelector;
