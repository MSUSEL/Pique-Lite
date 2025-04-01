import { createContext, useContext, ReactNode } from "react";
import { useProjectImport } from "./hooks/use-project-import";

interface Project {
  name: string;
  versions: Array<{ name: string; content: string }>; // Adjust this type based on your actual version structure
}

interface ProjectManagerContextType {
  projects: Record<string, Project>;
  selectedProject: string | null;
  createNewProject: () => void;
  setSelectedProject: (uuid: string) => void;
  updateProjectName: (uuid: string, newName: string) => void;
  selectFiles: () => void;
  invalidFiles: Array<{ name: string; reason: string }>;
  removeVersionFromProject: (projectId: string, fileName: string) => void;
  renderAfterFiles?: ReactNode;
  changeVersionVisibility: (projectId: string, versionName: string) => void;
}

const ProjectManagerContext = createContext<ProjectManagerContextType | null>(
  null
);

export const useProjectManager = () => {
  const context = useContext(ProjectManagerContext);
  if (!context) {
    throw new Error(
      "useProjectManager must be used within ProjectManagerProvider"
    );
  }
  return context;
};

interface ProjectManagerProviderProps {
  children: ReactNode;
  renderAfterFiles?: ReactNode;
}

export const ProjectManagerProvider = ({
  children,
  renderAfterFiles,
}: ProjectManagerProviderProps) => {
  const {
    projects = {},
    selectedProject = null,
    setSelectedProject,
    createNewProject,
    updateProjectName,
    selectFiles,
    invalidFiles,
    removeVersionFromProject,
    changeVersionVisibility,
  } = useProjectImport();

  const value: ProjectManagerContextType = {
    projects,
    selectedProject,
    createNewProject,
    setSelectedProject,
    updateProjectName,
    selectFiles,
    invalidFiles,
    removeVersionFromProject,
    changeVersionVisibility,
    renderAfterFiles,
  };
  console.log(value)
  return (
    <ProjectManagerContext.Provider value={value}>
      {children}
    </ProjectManagerContext.Provider>
  );
};
