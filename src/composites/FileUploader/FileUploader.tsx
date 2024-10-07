import { FileTextIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout } from "@radix-ui/themes";
import { useSetAtom, useAtom } from "jotai";
import React from "react";
import { State, Project } from "../../state/core";
import { useFileUpload } from "./use-file-uploader";
import { v4 as uuidv4 } from "uuid";

const loadFiles = async (
  files: File[]
): Promise<{ name: string; content: any; lastModified: number }[]> => {
  const filePromises = files.map(
    (file) =>
      new Promise<{ name: string; content: any; lastModified: number }>(
        (resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            const result = e.target?.result;
            try {
              const parsed = JSON.parse(result as string);
              resolve({
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

const extractVersionName = (name: string) => {
  const nameMask = /busybox-(\d+\.\d+\.\d+)_/;
  const match = name.match(nameMask);
  const version = match ? match[1] : name;
  return version;
};

interface FileUploaderProps {}

export const FileUploader: React.FC<FileUploaderProps> = ({}) => {
  const [_, selectFile] = useFileUpload();
  // const [fileName, setFileName] = useState("");
  // const [errors, setErrors] = useState<any>(null);
  const setProjects = useSetAtom(State.projects);
  const setSelectedProject = useSetAtom(State.selectedProject);

  const handleFileSelect = () => {
    selectFile({ accept: ".json", multiple: true }, (d: { file: File }[]) => {
      const filesToLoad = d.map((f) => f.file);
      console.log("Files to load:", filesToLoad);

      loadFiles(filesToLoad)
        .then((files) => {
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
        })
        .catch((errors) => {
          console.error("Error loading files:", errors);
        });
    });
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
          Please upload one or more PIQUE JSON file to get started.
        </Callout.Text>
      </Callout.Root>

      <Button
        size="4"
        variant="surface"
        radius="large"
        onClick={handleFileSelect}
      >
        <FileTextIcon /> Select Files
      </Button>
      {/* 
      {errors && <ErrorComponent errors={errors} />} */}
    </div>
  );
};
