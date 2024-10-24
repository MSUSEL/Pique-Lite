import { useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { State } from "../../state";
import { UploadedFile } from "../../types";
import { extractVersionName } from "./FileUploader";
import { Project } from "../../state";

// Custom hook for managing project-related actions
export const useProjects = () => {
  const setProjects = useSetAtom(State.projects);
  const setSelectedProject = useSetAtom(State.selectedProject);
  const selectedProjectId = useAtomValue(State.selectedProject);

  const [projects, setLocalProjects] = useState<Record<string, Project>>({});

  const addProject = (files: UploadedFile[]) => {
    setProjects((prevProjects = {}) => {
      const projectCount = Object.keys(prevProjects).length;
      const projectName = "Project " + (projectCount + 1);
      const projectUuid = uuidv4();

      const newProject: Project = {
        name: projectName,
        uuid: projectUuid,
        versions: files.map((f) => ({
          name: extractVersionName(f.name),
          fileName: f.name,
          data: f.content,
          date: new Date(f.lastModified),
        })),
      };

      setSelectedProject(projectUuid);

      // Update both the local state and global state
      setLocalProjects({
        ...prevProjects,
        [projectUuid]: newProject,
      });

      return {
        ...prevProjects,
        [projectUuid]: newProject,
      };
    });
  };

  const selectProject = (uuid: string) => {
    setSelectedProject(uuid);
  };

  return {
    projects,
    selectedProjectId,
    addProject,
    selectProject,
  };
};
