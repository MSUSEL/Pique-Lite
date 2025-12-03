import { useAtom } from "jotai";
import { Project, State, Version } from "../../../state/core";
import { v4 as uuidv4 } from "uuid";
import { ParsedDataset } from "../../../state/datasetAdapters";
import { useState } from "react";

interface FileMetadata {
  name: string;
  content: ParsedDataset;
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

  const createNewProject = (overrides?: Partial<Project> = {}) => {
    const projectCount = Object.keys(projects || {}).length;
    const defaults: Project = {
      name: `Project ${projectCount + 1}`,
      versions: [],
      uuid: uuidv4()
    };
    const projectUuid = overrides.uuid || defaults.uuid;
    setProjects((prev = {}) => {
      const newProjects = {
        ...prev,
        [projectUuid]: {
          ...defaults,
          ...overrides
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
        const { lite, processed, raw, source } = f.content;
        const version = {
          name: f.metadata.name,
          fileName: f.metadata.name,
          data: lite,
          processed,
          raw,
          source,
          date: lite.date ? new Date(lite.date) : new Date(f.metadata.lastModified),
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

  const removeProject = (projectId: string) => {
    setProjects((prev = {}) => {
      const { [projectId]: _, ...rest } = prev;
      return rest;
    });

    // Clear selection if the removed project was selected
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    }
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
    removeProject,
    setProjects
  };
}
