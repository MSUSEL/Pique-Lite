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

  const createNewProject = () => {
    const projectCount = Object.keys(projects || {}).length;
    const projectName = `Project ${projectCount + 1}`;
    const projectUuid = uuidv4();

    setProjects((prev = {}) => {
      const newProjects = {
        ...prev,
        [projectUuid]: {
          name: projectName,
          uuid: projectUuid,
          versions: []
        }
      };
      return newProjects;
    });

    setSelectedProjectId(projectUuid);
    return projectUuid;
  };

  const setSelectedProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const addFilesToProject = (projectId: string, files: FileMetadata[]) => {
    setProjects((prev = {}) => {
      const project = prev[projectId];
      if (!project) {
        return prev;
      }

      const newVersions: Version[] = files.map((f) => {
        const version = {
          name: f.metadata.name,
          fileName: f.metadata.name,
          data: f.content,
          date: f.content.date
            ? new Date(f.content.date)
            : new Date(f.metadata.lastModified),
          isHidden: false,
          versionId: uuidv4()
        };
        return version;
      });

      const updatedProject = {
        ...project,
        versions: [...(project.versions || []), ...newVersions]
      };

      const newProjects = {
        ...prev,
        [projectId]: updatedProject
      };

      return newProjects;
    });
  };

  const removeVersionFromProject = (projectId: string, versionName: string) => {
    setProjects((prev = {}) => {
      const project = prev[projectId];
      if (!project) return prev;

      const updatedProject = {
        ...project,
        versions: project.versions.filter((v) => v.name !== versionName)
      };

      const newProjects = {
        ...prev,
        [projectId]: updatedProject
      };

      return newProjects;
    });
  };

  const changeVersionVisibility = (projectId: string, versionName: string) => {
    setProjects((prev = {}) => {
      const project = prev[projectId];
      if (!project) return prev;

      const updatedProject = {
        ...project,
        versions: project.versions.map((v) => {
          if (v.name === versionName) {
            return {
              ...v,
              isHidden: !v.isHidden
            };
          }
          return v;
        })
      };

      const newProjects = {
        ...prev,
        [projectId]: updatedProject
      };

      return newProjects;
    });
  };

  const updateProjectName = (projectId: string, newName: string) => {
    setProjects((prev = {}) => {
      const updatedProject = { ...(prev[projectId] || {}), name: newName };
      const newProjects = {
        ...prev,
        [projectId]: updatedProject
      };

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
    updateProjectName
  };
}
