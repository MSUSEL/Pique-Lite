import { useAtom } from "jotai";
import { State, Version } from "../../state/core";
import { v4 as uuidv4 } from "uuid";
import { base } from "../../schema";

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
  const [selectedProject, setSelectedProject] = useAtom(State.selectedProject);

  const createNewProject = () => {
    const projectCount = Object.keys(projects || {}).length;
    const projectName = `Project ${projectCount + 1}`;
    const projectUuid = uuidv4();

    setProjects((prev = {}) => ({
      ...prev,
      [projectUuid]: {
        name: projectName,
        uuid: projectUuid,
        versions: [],
      },
    }));

    setSelectedProject(projectUuid);
    return projectUuid;
  };

  const addFilesToProject = (projectId: string, files: FileMetadata[]) => {
    console.log("Adding files:", files);
    setProjects((prev = {}) => {
      const project = prev[projectId];
      if (!project) {
        console.log("No project found for:", projectId);
        return prev;
      }

      const newVersions: Version[] = files.map((f) => ({
        name: f.metadata.name,
        fileName: f.metadata.name,
        data: f.content,
        date: f.content.date
          ? new Date(f.content.date)
          : new Date(f.metadata.lastModified),
      }));

      console.log("New versions:", newVersions);

      return {
        ...prev,
        [projectId]: {
          ...project,
          versions: [...(project.versions || []), ...newVersions],
        },
      };
    });
  };

  const removeVersionFromProject = (projectId: string, versionName: string) => {
    setProjects((prev = {}) => {
      const project = prev[projectId];
      if (!project) return prev;

      return {
        ...prev,
        [projectId]: {
          ...project,
          versions: project.versions.filter((v) => v.name !== versionName),
        },
      };
    });
  };

  const updateProjectName = (projectId: string, newName: string) => {
    setProjects((prev = {}) => ({
      ...prev,
      [projectId]: { ...(prev[projectId] || {}), name: newName },
    }));
  };

  return {
    projects,
    selectedProject,
    setSelectedProject,
    createNewProject,
    addFilesToProject,
    removeVersionFromProject,
    updateProjectName,
  };
}
