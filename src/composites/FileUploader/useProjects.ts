import { useState } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { v4 as uuidv4 } from "uuid";
import { State } from "../../state";
import { UploadedFile } from "../../types";
import { extractVersionName } from "./FileUploader";
import { Project } from "../../state";

// Custom hook for managing project-related actions
export const useProjects = () => {
  const projects = useAtomValue(State.projects); // Retrieve projects from global state
  const setProjects = useSetAtom(State.projects); // Modify projects in global state
  const setSelectedProject = useSetAtom(State.selectedProject); // Set the selected project globally
  const selectedProjectId = useAtomValue(State.selectedProject); //Retrieve global current project ID

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

      setSelectedProject(projectUuid); // Set the new project as selected

      return {
        ...prevProjects,
        [projectUuid]: newProject,
      };
    });
  };

  const selectProject = (uuid: string) => {
    setSelectedProject(uuid); // Select a project by its UUID
  };

  const removeProject = (id: string) => {
    setProjects((prevProjects) => {
      if (prevProjects == undefined) return undefined;

      // Create a new object excluding the project with the matching uuid
      const updatedProjects = Object.fromEntries(
        Object.entries(prevProjects).filter(([uuid]) => uuid !== id)
      );

      // Check if the selected project is being removed and reset if necessary
      if (prevProjects[id]) {
        setSelectedProject(undefined); // Deselect if the removed project was selected
      }

      return updatedProjects;
    });
  };

  return {
    projects, // Access current projects from global state
    selectedProjectId, //String ID of 'current' project
    addProject, // Add a new project
    selectProject, // Select a specific project
    removeProject, // Remove an existing project based on ID
  };
};
