import { useState } from 'react';
import { UploadedFile } from "types"; 

const loadFiles = async (
  files: File[]
): Promise<{ id: string; name: string; content: any; lastModified: number }[]> => {
  const filePromises = files.map((file) =>
    new Promise<{ id: string; name: string; content: any; lastModified: number }>(
      (resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const result = e.target?.result;
          try {
            const parsed = JSON.parse(result as string);
            const uniqueId = `${Date.now()}-${file.name}`;
            resolve({
              id: uniqueId,
              name: file.name,
              content: parsed,
              lastModified: file.lastModified,
            });
          } catch (error) {
            reject({
              name: file.name,
              error: "An error occurred while reading the file.",
            });
          }
        };
        fileReader.onerror = () =>
          reject({ name: file.name, error: "Failed to read file." });
        fileReader.readAsText(file);
      }
    )
  );

  try {
    const results = await Promise.all(filePromises);
    return results;
  } catch (errors) {
    console.error("Error loading files:", errors);
    throw errors;
  }
};

const useFileUploader = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loadedFiles, setLoadedFiles] = useState<any[]>([]);

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    setLoadedFiles((prevLoadedFiles) =>
      prevLoadedFiles.filter((file) => file.id !== id)
    );
  };

  //can uncomment once merged with schema
  const validateFileContent = (file: any) => {
//    try {
//       base.dataset.parse(file.content); 
//       return true;
//     } catch (error) {
//       console.error('Validation error:', error);
//       return false;
//     }
        return true;
  };

  const handleFileSelect = (selectedFiles: File[]) => {
    loadFiles(selectedFiles)
      .then((loadedFiles) => {
        setLoadedFiles(loadedFiles);
        setFiles((prevFiles) =>
          prevFiles.concat(
            loadedFiles.map((f) => {
              const isValid = validateFileContent(f); 
              return {
                id: f.id,
                name: f.name,
                verified: isValid,
              };
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error loading files:", error);
      });
  };

  const allFilesVerified = () => files.every((file) => file.verified);

  return {
    files,
    loadedFiles,
    handleFileSelect,
    removeFile,
    allFilesVerified,
  };
};

export default useFileUploader;
