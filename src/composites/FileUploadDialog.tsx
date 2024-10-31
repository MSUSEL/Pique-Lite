import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from "@radix-ui/react-dialog";
import { Button, Callout } from "@radix-ui/themes";
import { FileTextIcon, InfoCircledIcon, Cross1Icon } from "@radix-ui/react-icons";
import useFileUploader from "./FileUploader/useFileUploader";
import FileVerifier from "./FileUploader/FileVerifier";
import { useAtom } from "jotai";
import { State } from "../state/core";

export const FileUploadDialog: React.FC<{ selectedProjectId: string | undefined }> = ({ selectedProjectId }) => {
  const [projects, setProjects] = useAtom(State.projects);
  const { files, loadedFiles, handleFileSelect, removeFile, allFilesVerified } = useFileUploader();
  const [existingFiles, setExistingFiles] = useState<any[]>([]);

  useEffect(() => {
    if (selectedProjectId && projects) {
      const project = projects[selectedProjectId];
      if (project) {
        setExistingFiles(project.versions || []);
      }
    }
  }, [selectedProjectId, projects]);

  const handleSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
    handleFileSelect(selectedFiles);
  };

  const extractVersionName = (name: string) => {
    const nameMask = /busybox-(\d+\.\d+\.\d+)_/;
    const match = name.match(nameMask);
    const version = match ? match[1] : name;
    return version;
  };

  const handleAddFiles = () => {
    if (selectedProjectId) {
      console.log("Current Project State Before Adding Files:", JSON.stringify(projects[selectedProjectId], null, 2));
    }

    const formattedFiles = loadedFiles.map(file => ({
      name: extractVersionName(file.name), 
      fileName: file.name,
      data: file.content,
      date: new Date(file.lastModified),
    }));

    setExistingFiles(prev => {
      const updatedFiles = [...prev, ...formattedFiles];
      console.log("Updated Existing Files:", updatedFiles);
      return updatedFiles;
    });

    handleFileSelect([]);
  };

  const handleContinue = () => {
    if (selectedProjectId) {
      const updatedProjects = { ...projects };
      const projectToUpdate = updatedProjects[selectedProjectId];

      if (projectToUpdate) {
        projectToUpdate.versions = [...existingFiles];
        setProjects(updatedProjects);
        console.log("Updated Project State After Adding Files:", JSON.stringify(updatedProjects[selectedProjectId], null, 2));
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="surface" size="4" radius="large">
          <FileTextIcon /> Upload Files
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            inset: 0,
          }}
        />
        <DialogContent
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "30px",
            width: "75vw",
            height: "75vh",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            color: "black",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <DialogClose asChild>
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "blue",
                background: "none",
                border: "1 px",
                bordercolor: "blue",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              <Cross1Icon />
            </button>
          </DialogClose>

          {/* Left side - existing files */}
          <div style={{ width: "50%", borderRight: "1px solid #ddd" }}>
            <h4>Existing Files:</h4>
            {existingFiles.map((file, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {file.name} 
                <Button variant="outline" size="2" onClick={() => removeFile(file.id)}>Remove</Button>
              </div>
            ))}
          </div>

          {/* Right side - new uploaded files */}
          <div style={{ width: "50%", paddingLeft: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <DialogTitle style={{ fontSize: "24px", marginBottom: "20px" }}>
              Upload PIQUE JSON Files
            </DialogTitle>

            <Callout.Root size="2" style={{ marginBottom: "16px" }}>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                Please upload one or more PIQUE JSON files to get started.
              </Callout.Text>
            </Callout.Root>

            <input
              type="file"
              accept=".json"
              multiple
              onChange={handleSelectFiles}
              style={{ marginBottom: "16px" }}
            />

            <FileVerifier files={files} onRemove={removeFile} />

            {files.length > 0 && allFilesVerified() && (
              <>
                <Button
                  variant="solid"
                  size="4"
                  radius="large"
                  style={{ marginTop: "20px" }}
                  onClick={handleAddFiles} 
                >
                  Add Files
                </Button>

                {existingFiles.length > 0 && (
                  <DialogClose asChild>
                    <Button
                      variant="solid"
                      size="4"
                      radius="large"
                      style={{ marginTop: "10px" }}
                      onClick={handleContinue} 
                    >
                      Continue
                    </Button>
                  </DialogClose>
                )}
              </>
            )}

            {files.length > 0 && !files.every((file) => file.verified) && (
              <Callout.Root color="red" style={{ marginTop: "20px" }} size="2">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Please delete unverified files to continue.
                </Callout.Text>
              </Callout.Root>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default FileUploadDialog;
