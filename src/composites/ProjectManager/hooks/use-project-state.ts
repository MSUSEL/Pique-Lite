import { useAtom } from "jotai";
import { State, Version } from "../../../state/core";
import { v4 as uuidv4 } from "uuid";
import { base } from "../../../state/schema";
import { useState } from "react";

interface FileMetadata {
  name: string;
  content: base.Schema;
  metadata: {
    name: string;
    lastModified: number;
  };
}

export function useProjectState() {
  const [projects, setProjects] = useAtom(State.projects);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  console.log("Current projects state:", projects);

  const createNewProject = () => {
    const projectCount = Object.keys(projects || {}).length;
    const projectName = `Project ${projectCount + 1}`;
    const projectUuid = uuidv4();

    console.log("Creating new project:", { projectName, projectUuid });

    setProjects((prev = {}) => {
      const newProjects = {
        ...prev,
        [projectUuid]: {
          name: projectName,
          uuid: projectUuid,
          versions: [],
        },
      };
      console.log("Updated projects after creation:", newProjects);
      return newProjects;
    });

    setSelectedProjectId(projectUuid);
    return projectUuid;
  };

  const setSelectedProject = (projectId: string) => {
    console.log("Setting selected project:", projectId);
    setSelectedProjectId(projectId);
  };

  const addFilesToProject = (projectId: string, files: FileMetadata[]) => {
    console.log("Adding files to project:", { projectId, files });
    setProjects((prev = {}) => {
      const project = prev[projectId];
      if (!project) {
        console.log("No project found for:", projectId);
        return prev;
      }

      console.log("Current project state:", project);
      console.log("Current project versions:", project.versions);

      const newVersions: Version[] = files.map((f) => {
        const version = {
          name: f.metadata.name,
          fileName: f.metadata.name,
          data: f.content,
          date: f.content.date
            ? new Date(f.content.date)
            : new Date(f.metadata.lastModified),
          isHidden: false,
        };
        console.log("Creating version:", version);
        return version;
      });

      console.log("All new versions to add:", newVersions);

      const updatedProject = {
        ...project,
        versions: [...(project.versions || []), ...newVersions],
      };

      console.log("Updated project with new versions:", updatedProject);

      const newProjects = {
        ...prev,
        [projectId]: updatedProject,
      };

      console.log("Final projects state:", newProjects);

      return newProjects;
    });
  };

  const removeVersionFromProject = (projectId: string, versionName: string) => {
    console.log("Removing version from project:", { projectId, versionName });
    setProjects((prev = {}) => {
      const project = prev[projectId];
      if (!project) return prev;

      const updatedProject = {
        ...project,
        versions: project.versions.filter((v) => v.name !== versionName),
      };

      const newProjects = {
        ...prev,
        [projectId]: updatedProject,
      };

      console.log("Updated project after removal:", updatedProject);
      console.log("Updated projects state:", newProjects);

      return newProjects;
    });
  };

  const changeVersionVisibility = (projectId: string, versionName: string) => {
    console.log("Changing version visibility:", { projectId, versionName });
    setProjects((prev = {}) => {
      const project = prev[projectId];
      if (!project) return prev;

      const updatedProject = {
        ...project,
        versions: project.versions.map((v) => {
          if (v.name === versionName) {
            return {
              ...v,
              isHidden: !v.isHidden,
            };
          }
          return v;
        }),
      };

      const newProjects = {
        ...prev,
        [projectId]: updatedProject,
      };

      console.log("Updated project after visibility change:", updatedProject);
      console.log("Updated projects state:", newProjects);

      return newProjects;
    });
  };

  const updateProjectName = (projectId: string, newName: string) => {
    console.log("Updating project name:", { projectId, newName });
    setProjects((prev = {}) => {
      const updatedProject = { ...(prev[projectId] || {}), name: newName };
      const newProjects = {
        ...prev,
        [projectId]: updatedProject,
      };

      console.log("Updated project after name change:", updatedProject);
      console.log("Updated projects state:", newProjects);

      return newProjects;
    });
  };

  return {
    projects,
    selectedProject: selectedProjectId,
    setSelectedProject,
    createNewProject,
    addFilesToProject,
    removeVersionFromProject,
    changeVersionVisibility,
    updateProjectName,
  };
}
