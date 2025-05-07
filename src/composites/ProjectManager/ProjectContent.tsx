import { Button } from "../../components/ui/button";
import { VersionListProvider } from "../VersionList/context";
import { PaginationButtons } from "../VersionList/PaginationButtons";
import { SearchHeader } from "../VersionList/SearchHeader";
import { VersionTable } from "../VersionList/VersionTable";
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
    <div className="project-content-root flex h-[100%] max-h-[100%] flex-1 flex-col">
      {!Object.keys(projects || {}).length ? (
        <div className="project-manager-content-container flex flex-1 flex-col items-center justify-center gap-4 py-9">
          <p className="text-muted-foreground text-lg font-bold">
            No projects added yet
          </p>
          <p className="text-muted-foreground text-sm">
            Add a new project to get started
          </p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-muted-foreground text-sm">
              Manage Project Files
            </h2>
          </div>
          {/* <VersionList */}
          {/*   versions={currentProjectVersions} */}
          {/*   invalidFiles={invalidFiles} */}
          {/*   onRemoveVersion={handleRemoveVersion} */}
          {/*   onUpdateVersionVisibility={handleChangeVisibility} */}
          {/* /> */}

          <VersionListProvider
            versions={currentProjectVersions}
            invalidFiles={invalidFiles}
            onRemoveVersion={handleRemoveVersion}
            onUpdateVersionVisibility={handleChangeVisibility}
            itemsPerPage={10}
          >
            <div className="flex h-full min-h-0 flex-col gap-2">
              <div className="grid grid-cols-[auto_max-content] gap-2">
                <SearchHeader />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={selectFiles}
                  disabled={!selectedProject}
                >
                  Add Files
                </Button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <VersionTable />
              </div>
              <div className="flex justify-center">
                <PaginationButtons />
              </div>
            </div>
          </VersionListProvider>
        </div>
      )}
      {renderAfterFiles}
    </div>
  );
};
