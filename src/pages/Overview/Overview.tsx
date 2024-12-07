import React from "react";
import { useSetAtom } from "jotai";
import { State } from "../../state";
import { Box, Flex } from "@radix-ui/themes";
import { useProjects } from "../../composites/FileUploader/useProjects";
import { ProjectCard } from "./ProjectCard";
import "./Overview.css";

const Overview: React.FC = () => {
  const { projects, selectedProjectId } = useProjects();
  const setCurrentView = useSetAtom(State.currentView);
  const setProject = useSetAtom(State.selectedProject);
  const setVersion = useSetAtom(State.selectedVersion);

  if (!projects || !selectedProjectId) return null;

  return (
    <Box className="Overview-root">
      <Flex direction="column">
        {Object.entries(projects).map(([uuid, project]) => {
          if (project.versions.length === 0) return null;

          return (
            <ProjectCard
              key={uuid}
              uuid={uuid}
              project={project}
              //version={project.versions[project.versions.length - 1]}
              onProjectClick={(versionIndex) => {
                setCurrentView("project");
                setProject(uuid);
                setVersion(versionIndex);
              }}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default Overview;
