import { useFileSelect } from "./use-file-upload-hook";
import { useProjectState } from "./use-project-state";
import { useState } from "react";
import { parseDataset } from "../../../state/datasetAdapters";

export const useProjectImport = () => {
  const {
    projects,
    selectedProject,
    setSelectedProject,
    createNewProject,
    addFilesToProject,
    removeVersionFromProject,
    changeVersionVisibility,
    updateProjectName,
    removeProject,
  } = useProjectState();

  // Track invalid files
  const [invalidFiles, setInvalidFiles] = useState<
    { name: string; reason: string }[]
  >([]);

  // Parser function for the file content
  const parseFile = async (file: File) => {
    const content = await file.text();
    const data = JSON.parse(content);
    const parsedDataset = parseDataset(data); // throws if invalid
    return {
      content: parsedDataset,
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

  const removeInvalidFile = (fileName: string) => {
    setInvalidFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const clearAllInvalidFiles = () => {
    setInvalidFiles([]);
  };

  return {
    projects,
    selectedProject,
    setSelectedProject,
    createNewProject,
    updateProjectName,
    removeProject,
    selectFiles,
    invalidFiles,
    removeInvalidFile,
    clearAllInvalidFiles,
    removeVersionFromProject,
    changeVersionVisibility,
  };
};
