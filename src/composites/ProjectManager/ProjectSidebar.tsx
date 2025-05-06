import { PlusIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { ProjectListItem } from "./ProjectListItem";
import { useProjectManager } from "./ProjectManagerContext";
//import { useState } from "react";

export const ProjectSidebar = () => {
  const {
    projects,
    selectedProject,
    createNewProject,
    setSelectedProject,
    updateProjectName,
  } = useProjectManager();

  // Remove the commented lines if you want to use the search functionality
  //const [searchQuery, setSearchQuery] = useState<string>("");

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  // const filteredProjects = Object.entries(projects).filter(([, project]) => {
  //   if (project.versions.length === 0) return false;

  //   const queryLowercase = searchQuery.toLowerCase();
  //   const matchesSearch =
  //     queryLowercase === "" ||
  //     project.name.toLowerCase().includes(queryLowercase);

  //   return matchesSearch;
  // });

  return (
    <div className="flex flex-col gap-3 p-4 bg-muted border-r">
      <div className="flex flex-row justify-between items-center gap-3">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={createNewProject}
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2">
          {/* <input
            type="text"
            placeholder="Search projects..."
            onChange={handleSearchChange}
            value={searchQuery}
            style={{
              margin: "10px",
              background: "var(--gray-2)",
              width: "95%",
              border: "none",
              borderBottom: "2px solid gray",
              color: "black",
            }}
          /> */}
          {Object.entries(projects).map(([uuid, project]) => {
            return (
              <ProjectListItem
                key={uuid}
                name={project.name}
                onClick={() => setSelectedProject(uuid)}
                onEditName={(newName) => updateProjectName(uuid, newName)}
                isSelected={selectedProject === uuid}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
