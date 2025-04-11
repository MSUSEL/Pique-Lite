import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { VersionList } from "../VersionList";
import { useProjectManager } from "./ProjectManagerContext";

export const ProjectContent = () => {
  const {
    projects,
    selectedProject,
    selectFiles,
    invalidFiles,
    removeVersionFromProject,
    renderAfterFiles,
    changeVersionVisibility
  } = useProjectManager();

  const currentProjectVersions = selectedProject
    ? (projects?.[selectedProject]?.versions ?? [])
    : [];

  const handleRemoveVersion = (fileName: string) => {
    if (selectedProject) {
      removeVersionFromProject(selectedProject, fileName);
    }
  };

  const handleChangeVisibility = (fileName: string) => {
    if (selectedProject) {
      changeVersionVisibility(selectedProject, fileName);
    }
  };

  return (
    <div className="project-manager-content">
      <div className="p-4">
        {!Object.keys(projects || {}).length ? (
          <div className="project-manager-content-container flex flex-col items-start justify-start gap-4 py-9">
            <p className="text-muted-foreground text-lg font-bold">
              No projects added yet
            </p>
            <p className="text-muted-foreground text-sm">
              Add a new project to get started
            </p>
          </div>
        ) : (
          <>
            <div className="">
              <h2 className="text-muted-foreground text-sm">
                Manage Project Files
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={selectFiles}
                disabled={!selectedProject}
              >
                Add Files
              </Button>
            </div>
            <VersionList
              versions={currentProjectVersions}
              invalidFiles={invalidFiles}
              onRemoveVersion={handleRemoveVersion}
              onUpdateVersionVisibility={handleChangeVisibility}
            />
          </>
        )}
      </div>
      {renderAfterFiles}
    </div>
  );
};
