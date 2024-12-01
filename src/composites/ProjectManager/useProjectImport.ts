import { useFileSelect } from "./use-file-upload-hook";
import { base } from "../../schema";
import { useProjectState } from "./useProjectState";
import { useState } from "react";

export const useProjectImport = () => {
  const {
    projects,
    selectedProject,
    setSelectedProject,
    createNewProject,
    addFilesToProject,
    removeVersionFromProject,
    updateProjectName,
  } = useProjectState();

  // Track invalid files
  const [invalidFiles, setInvalidFiles] = useState<
    { name: string; reason: string }[]
  >([]);

  // Parser function for the file content
  const parseFile = async (file: File) => {
    const content = await file.text();
    const data = JSON.parse(content);
    base.dataset.parse(data); // This will throw if invalid
    return {
      content: data,
      metadata: {
        name: file.name,
        lastModified: file.lastModified,
      },
    };
  };

  const { selectFiles, selectFolder } = useFileSelect(
    parseFile,
    {
      acceptedTypes: [".json"],
      maxSize: 10 * 1024 * 1024, // 10MB limit
    },
    {
      onValidFile: async (handle, parsed) => {
        if (!selectedProject) {
          const newProjectId = createNewProject();
          addFilesToProject(newProjectId, [parsed]);
        } else {
          addFilesToProject(selectedProject, [parsed]);
        }
      },
      onInvalidFile: (name, reason) => {
        setInvalidFiles((prev) => [...prev, { name, reason }]);
      },
      onError: (error) => {
        console.error("File upload error:", error);
      },
    }
  );

  return {
    projects,
    selectedProject,
    setSelectedProject,
    createNewProject,
    updateProjectName,
    selectFiles,
    invalidFiles,
    removeVersionFromProject,
  };
};
