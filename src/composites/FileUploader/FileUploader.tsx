import { FileTextIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import { useFileUpload } from "./use-file-uploader";
import FileVerifier from "./FileVerifier";
import { UploadedFile } from "../../types";
import { useSetAtom, useAtom } from "jotai";
import { State, Project } from "../../state/core";
import { v4 as uuidv4 } from "uuid";
import { base } from "../../schema";

const loadFiles = async (
  files: File[]
): Promise<
  { id: string; name: string; content: any; lastModified: number }[]
> => {
  const filePromises = files.map(
    (file) =>
      new Promise<{
        id: string;
        name: string;
        content: any;
        lastModified: number;
      }>((resolve, reject) => {
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
      })
  );

  try {
    const results = await Promise.all(filePromises);
    return results;
  } catch (errors) {
    console.error("Error loading files:", errors);
    throw errors;
  }
};

const extractVersionName = (name: string) => {
  const nameMask = /busybox-(\d+\.\d+\.\d+)_/;
  const match = name.match(nameMask);
  const version = match ? match[1] : name;
  return version;
};

interface FileUploaderProps {}

export const FileUploader: React.FC<FileUploaderProps> = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loadedFiles, setLoadedFiles] = useState<any[]>([]);
  const [, selectFile] = useFileUpload();
  const setProjects = useSetAtom(State.projects);
  const [selectedProject, setSelectedProject] = useAtom(State.selectedProject);
  const [projects] = useAtom(State.projects);

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    setLoadedFiles((prevLoadedFiles) =>
      prevLoadedFiles.filter((file) => file.id !== id)
    );
  };

  const validateFileContent = (file: any) => {
    try {
      base.dataset.parse(file.content);
      return true;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
    //return true;
  };

  const handleFileSelect = () => {
    selectFile({ accept: ".json", multiple: true }, (d: { file: File }[]) => {
      const filesToLoad = d.map((f) => f.file);
      console.log("Files to load:", filesToLoad);

      loadFiles(filesToLoad)
        .then((loadedFiles) => {
          setLoadedFiles(loadedFiles);
          setFiles((prevFiles) =>
            prevFiles.concat(
              loadedFiles.map((f) => {
                const isValid = validateFileContent(f);
                return {
                  id: f.id,
                  name: f.name,
                  content: f.content,
                  lastModified: f.lastModified,
                  verified: isValid,
                };
              })
            )
          );
        })
        .catch((error) => {
          console.error("Error loading files:", error);
        });
    });
  };

  const handleContinue = () => {
    if (loadedFiles.length > 0) {
      setProjects((prevProjects = {}) => {
        const projectCount = Object.keys(prevProjects).length;
        const projectName = "Project " + (projectCount + 1);
        const projectUuid = uuidv4();

        const newProject: Project = {
          name: projectName,
          versions: files.map((f) => ({
            name: extractVersionName(f.name),
            fileName: f.name,
            data: f.content,
            date: new Date(f.lastModified),
          })),
        };

        setSelectedProject(projectUuid);

        return {
          ...prevProjects,
          [projectUuid]: newProject,
        };
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg"
          alt="CISA Logo"
          width="100"
          height="100"
          style={{ marginRight: "20px" }}
        />
        <h1>PIQUE LITE</h1>
        <img
          src="https://raw.githubusercontent.com/MSUSEL/msusel-pique-visualizer/refactorZiyi/src/assets/PIQUE_svg.svg"
          alt="PIQUE Logo"
          width="100"
          height="100"
          style={{ marginLeft: "20px" }}
        />
      </div>

      <Callout.Root size="2">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          Please upload one or more PIQUE JSON files to get started.
        </Callout.Text>
      </Callout.Root>

      <Button
        size="4"
        variant="surface"
        radius="large"
        onClick={handleFileSelect}
        style={{ margin: "16px" }}
      >
        <FileTextIcon /> Select Files
      </Button>

      <FileVerifier files={files} onRemove={removeFile} />

      {files.length > 0 && files.every((file) => file.verified) && (
        <Button
          size="4"
          variant="solid"
          radius="large"
          onClick={handleContinue}
          style={{ marginTop: "10px" }}
        >
          Continue
        </Button>
      )}

      {files.length > 0 && !files.every((file) => file.verified) && (
        <Callout.Root color="red" style={{ margin: "16px" }} size="2">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            Please delete unverified files to continue.
          </Callout.Text>
        </Callout.Root>
      )}
    </div>
  );
};
