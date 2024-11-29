import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  Root,
} from "@radix-ui/react-dialog";
import { Button, Callout, Theme } from "@radix-ui/themes";
import {
  FileTextIcon,
  InfoCircledIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import useFileUploader from "./FileUploader/useFileUploader";
import FileVerifier from "./FileUploader/FileVerifier";
import { useAtom } from "jotai";
import { State } from "../state/core";
import { createNewProject } from "../state/core";

export const FileUploadDialog: React.FC<{
  selectedProjectId: string | undefined;
}> = ({ selectedProjectId }) => {
  const [projects, setProjects] = useAtom(State.projects);
  const [currentProjectId, setCurrentProjectId] = useState(selectedProjectId);
  const {
    files,
    loadedFiles,
    handleFileSelect,
    removeFile,
    allFilesVerified,
    resetFiles,
  } = useFileUploader();
  const [existingFiles, setExistingFiles] = useState<any[]>([]);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [editProjectName, setEditProjectName] = useState("");

  useEffect(() => {
    if (currentProjectId && projects) {
      const project = projects[currentProjectId];
      if (project) {
        setExistingFiles(project.versions || []);
      }
    }
  }, [currentProjectId, projects]);

  const handleSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    handleFileSelect(selectedFiles);
  };

  const extractVersionName = (name: string) => {
    const nameMask = /busybox-(\d+\.\d+\.\d+)_/;
    const match = name.match(nameMask);
    return match ? match[1] : name;
  };

  const handleAddFiles = () => {
    const formattedFiles = loadedFiles.map((file) => ({
      name: extractVersionName(file.name),
      fileName: file.name,
      data: file.content,
      date: new Date(file.lastModified),
    }));

    setExistingFiles((prev) => [...prev, ...formattedFiles]);
  };

  const handleContinue = () => {
    if (currentProjectId) {
      setProjects((prevProjects) => {
        const updatedProjects = { ...prevProjects };
        const projectToUpdate = updatedProjects[currentProjectId];
        if (projectToUpdate) {
          projectToUpdate.versions = [...existingFiles];
        }
        return updatedProjects;
      });
    }
    resetFiles();
  };

  const handleNewProject = () => {
    const newProjectId = createNewProject(projects, setProjects);
    setCurrentProjectId(newProjectId);
    setExistingFiles([]);
  };

  const handleEditProjectName = (uuid: string, name: string) => {
    setProjects((prevProjects) => ({
      ...prevProjects,
      [uuid]: { ...prevProjects[uuid], name },
    }));
    setEditProjectId(null);
  };

  const removeVersionFromProject = (versionName: string) => {
    console.log(
      "Removing version:",
      versionName,
      "from project:",
      currentProjectId
    );

    if (currentProjectId) {
      setProjects((prevProjects) => {
        const updatedProjects = { ...prevProjects };
        const projectToUpdate = updatedProjects[currentProjectId];
        console.log("Before update:", projectToUpdate);

        if (projectToUpdate) {
          projectToUpdate.versions = projectToUpdate.versions.filter(
            (file: any) => file.name !== versionName
          );
        }

        console.log("After update:", projectToUpdate);
        return updatedProjects;
      });

      setExistingFiles((prevFiles) => {
        console.log("Existing files before removal:", prevFiles);
        const updatedFiles = prevFiles.filter(
          (file) => file.name !== versionName
        );
        console.log("Existing files after removal:", updatedFiles);
        return updatedFiles;
      });
    }
  };

  return (
    <Root>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="surface" size="4" radius="large">
            <FileTextIcon /> Upload Files
          </Button>
        </DialogTrigger>

        <DialogPortal>
          <Theme>
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
                width: "85vw",
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
                    cursor: "pointer",
                  }}
                  aria-label="Close"
                >
                  <Cross1Icon />
                </button>
              </DialogClose>

              {/* Left column - project selection */}
              <div
                style={{
                  width: "20%",
                  borderRight: "1px solid #ddd",
                  paddingRight: "10px",
                }}
              >
                <h4>Select Project:</h4>
                {Object.entries(projects).map(([uuid, project]) => (
                  <div
                    key={uuid}
                    onDoubleClick={() => {
                      setEditProjectId(uuid);
                      setEditProjectName(project.name);
                    }}
                    onClick={() => setCurrentProjectId(uuid)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      backgroundColor:
                        uuid === currentProjectId ? "#e0e0e0" : "transparent",
                    }}
                  >
                    {editProjectId === uuid ? (
                      <input
                        type="text"
                        value={editProjectName}
                        onChange={(e) => setEditProjectName(e.target.value)}
                        onBlur={() => {
                          return handleEditProjectName(uuid, editProjectName);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleEditProjectName(uuid, editProjectName);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      project.name
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="4"
                  onClick={handleNewProject}
                  style={{ marginTop: "10px" }}
                >
                  + Create New Project
                </Button>
              </div>

              {/* Middle column - existing files */}
              <div
                style={{
                  width: "20%",
                  borderRight: "1px solid #ddd",
                  padding: "0 10px",
                }}
              >
                <h4>Existing Files:</h4>
                {existingFiles.map((file, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {file.name}
                    <Button
                      variant="outline"
                      size="2"
                      onClick={() => removeVersionFromProject(file.name)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              {/* Right column - file uploader */}
              <div
                style={{
                  width: "60%",
                  paddingLeft: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <DialogTitle style={{ fontSize: "24px", marginBottom: "20px" }}>
                  Upload PIQUE JSON Files
                </DialogTitle>
                <Callout.Root size="2">
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
                  <Callout.Root
                    color="red"
                    style={{ marginTop: "20px" }}
                    size="2"
                  >
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
          </Theme>
        </DialogPortal>
      </Dialog>
    </Root>
  );
};

export default FileUploadDialog;
