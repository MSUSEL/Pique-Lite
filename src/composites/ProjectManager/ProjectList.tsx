import { PlusIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton } from "@radix-ui/themes";
import { ProjectListItem } from "./ProjectListItem";
import { useProjectManager } from "./ProjectManagerContext";
//import { useState } from "react";

export const ProjectList = () => {
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
    <Flex
      direction="column"
      gap="3"
      p="4"
      style={{
        backgroundColor: "var(--gray-2)",
        borderRight: "1px solid var(--gray-6)",
      }}
    >
      <Flex direction="row" justify="between" align="center" gap="3">
        <Heading size="6">Projects</Heading>
        <IconButton
          variant="soft"
          size="1"
          color="gray"
          onClick={createNewProject}
        >
          <PlusIcon fontWeight="bold" />
        </IconButton>
      </Flex>
      <Flex direction="column" gap="2">
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
      </Flex>
    </Flex>
  );
};
