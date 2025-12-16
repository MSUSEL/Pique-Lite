import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAtomValue } from "jotai";
import { BookOpen, ExternalLink, Layers, Pencil, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/components/lib/utils";
import { State } from "../../state";
import { useProjectImport } from "./hooks/use-project-import";
import { VersionListProvider } from "../VersionList/context";
import { SearchHeader } from "../VersionList/SearchHeader";
import { VersionTable } from "../VersionList/VersionTable";

interface ProjectManagerDialogProps {
  trigger: React.ReactNode;
  triggerAsChild?: boolean;
  onContinue: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ProjectManagerDialog = ({
  onContinue,
  trigger,
  triggerAsChild = false,
  open,
  onOpenChange
}: ProjectManagerDialogProps) => {
  const projects = useAtomValue(State.projects);
  const {
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
    changeVersionVisibility
  } = useProjectImport();

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild={triggerAsChild}>{trigger}</DialogTrigger>
      <DialogContent className="p-0 h-[80svh] w-[80vw] max-w-[80vw] sm:max-w-[80vw]">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Project Manager</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <div className="grid h-full w-full grid-cols-[300px_1fr] overflow-hidden">
            {/* Left Sidebar - Projects List */}
            <div className="bg-muted flex flex-col gap-3 p-4">
            <div className="flex flex-row items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Projects</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={createNewProject}>
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add New Project</TooltipContent>
              </Tooltip>
            </div>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-2">
                {Object.entries(projects || {}).map(([uuid, project]) => {
                  return (
                    <ProjectListItem
                      key={uuid}
                      name={project.name}
                      onClick={() => setSelectedProject(uuid)}
                      onEditName={(newName) => updateProjectName(uuid, newName)}
                      onDelete={() => removeProject(uuid)}
                      isSelected={selectedProject === uuid}
                    />
                  );
                })}
              </div>
            </ScrollArea>
            <div className="flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="link"
                    className="justify-center px-0 text-sm font-normal text-blue-600 hover:text-blue-700"
                  >
                    <a
                      href="https://tool-documentation-demo.netlify.app/docs/pique-lite/user-guide/input-schema/file-upload/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="h-3 w-3" />
                        📘 How to Upload & Manage Files
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open documentation in a new tab</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Right Content - Files & Button */}
          <div className="grid grid-rows-[1fr_max-content] overflow-hidden p-4">
            <div className="flex h-full max-h-full min-h-0 flex-col overflow-hidden">
              {!Object.keys(projects || {}).length ? (
                <div className="flex h-full flex-1 flex-col items-center justify-center gap-4">
                  <p className="text-muted-foreground text-lg font-bold">
                    No projects added yet
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Add a new project to get started
                  </p>
                </div>
              ) : (
                <div className="flex h-full min-h-0 flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-muted-foreground text-sm">
                      Manage Project Files
                    </h2>
                  </div>

                  <VersionListProvider
                    versions={currentProjectVersions}
                    invalidFiles={invalidFiles}
                    onRemoveVersion={handleRemoveVersion}
                    onRemoveInvalidFile={removeInvalidFile}
                    onUpdateVersionVisibility={handleChangeVisibility}
                  >
                    <div className="flex h-full min-h-0 flex-col gap-2">
                      <div className="grid grid-cols-[auto_max-content_max-content] gap-2">
                        <SearchHeader />
                        {invalidFiles.length > 0 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={clearAllInvalidFiles}
                              >
                                Clear {invalidFiles.length} Error{invalidFiles.length !== 1 ? 's' : ''}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Remove all invalid files from the list</TooltipContent>
                          </Tooltip>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={selectFiles}
                              disabled={!selectedProject}
                            >
                              Add Files
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {!selectedProject ? 'Select a project first' : 'Add files to this project'}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="min-h-0 flex-1 overflow-auto">
                        <VersionTable />
                      </div>
                    </div>
                  </VersionListProvider>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={onContinue}
                disabled={!Object.keys(projects || {}).length}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Inline ProjectListItem component
interface ProjectListItemProps {
  name: string;
  onClick?: () => void;
  onEditName?: (newName: string) => void;
  onDelete?: () => void;
  isSelected?: boolean;
}

const ProjectListItem = ({
  name,
  onClick,
  onEditName,
  onDelete,
  isSelected = false
}: ProjectListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  const handleEditComplete = () => {
    setIsEditing(false);
    if (onEditName && editedName !== name) {
      onEditName(editedName);
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr_auto_auto] items-center gap-2",
        isSelected ? "bg-gray-200" : "transparent"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: onClick ? "pointer" : "default",
        padding: "6px",
        borderRadius: "4px"
      }}
    >
      <Layers className="h-4 w-4" />
      {isEditing ? (
        <Input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          onBlur={handleEditComplete}
          onKeyDown={(e) => e.key === "Enter" && handleEditComplete()}
          autoFocus
          style={{ width: "fit-content", margin: 0 }}
        />
      ) : (
        <span>{name}</span>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEditClick}
            style={{
              visibility: isHovered && !isEditing ? "visible" : "hidden"
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit Project Name</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDeleteClick}
            style={{
              visibility: isHovered && !isEditing ? "visible" : "hidden"
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Delete Project</TooltipContent>
      </Tooltip>
    </div>
  );
};
