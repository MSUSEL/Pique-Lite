import { useSetAtom, useAtomValue } from "jotai";
import { State } from "../../../state";
import { Project } from "../../../state";

// Custom hook for managing project-related actions
export const useProjects = () => {
  const projects = useAtomValue(State.projects);
  const setProjects = useSetAtom(State.projects);

  const addProject = (project: Project) => {
    setProjects((prevProjects = {}) => ({
      ...prevProjects,
      [project.uuid]: project,
    }));
  };

  const removeProject = (id: string) => {
    setProjects((prevProjects) => {
      if (!prevProjects) return undefined;

      // Create a new object excluding the project with the matching uuid
      const updatedProjects = Object.fromEntries(
        Object.entries(prevProjects).filter(([uuid]) => uuid !== id)
      );
      return updatedProjects;
    });
  };

  return {
    projects,
    addProject,
    removeProject,
  };
};
