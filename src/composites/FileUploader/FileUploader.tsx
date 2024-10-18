import { FileTextIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import useFileUploader from "./useFileUploader"; 
import FileVerifier from "./FileVerifier";
import { useSetAtom, useAtom } from "jotai";
import { State, Project } from "../../state/core";
import { v4 as uuidv4 } from "uuid";

export const FileUploader: React.FC = () => {
  const { files, loadedFiles, handleFileSelect, removeFile, allFilesVerified } = useFileUploader();
  const setProject = useSetAtom(State.project);
  const setProjects = useSetAtom(State.projects);
  const [selectedProject, setSelectedProject] = useAtom(State.selectedProject);

  const extractVersionName = (name: string) => {
    const nameMask = /busybox-(\d+\.\d+\.\d+)_/;
    const match = name.match(nameMask);
    const version = match ? match[1] : name;
    return version;
  };

  const handleContinue = () => {
    setProjects((prevProjects = {}) => {
      const projectCount = Object.keys(prevProjects).length;
      const projectName = "Project " + (projectCount + 1);
      const projectUuid = uuidv4();

      const newProject: Project = {
        name: projectName,
        versions: loadedFiles.map((f) => ({
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
    
    if (loadedFiles.length > 0) {
      setProject({
        versions: loadedFiles.map((f) => ({
          name: extractVersionName(f.name),
          fileName: f.name,
          data: f.content,
          date: new Date(f.lastModified),
        })),
      });
    }
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.multiple = true;

    input.onchange = (event) => {
      const files = event.target.files;
      if (files) {
        handleFileSelect(Array.from(files)); 
      }
    };

    input.click(); 
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
        onClick={handleFileUpload} 
        style={{ margin: "16px" }}
      >
        <FileTextIcon /> Select Files
      </Button>

      <FileVerifier files={files} onRemove={removeFile} />

      {files.length > 0 && (
        <Button
          size="4"
          variant="solid"
          radius="large"
          onClick={handleContinue}
          style={{ marginTop: "10px" }}
          disabled={!allFilesVerified()} 
        >
          Continue
        </Button>
      )}
    {files.length > 0 && !files.every(file => file.verified) && (
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