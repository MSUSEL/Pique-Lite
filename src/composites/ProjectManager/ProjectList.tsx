import { PlusIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton } from "@radix-ui/themes";
import { ProjectListItem } from "./ProjectListItem";
import { useProjectManager } from "./ProjectManagerContext";

export const ProjectList = () => {
  const {
    projects,
    selectedProject,
    createNewProject,
    setSelectedProject,
    updateProjectName,
  } = useProjectManager();

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
        {Object.entries(projects || {}).map(([uuid, project]) => (
          <ProjectListItem
            key={uuid}
            name={project.name}
            onClick={() => setSelectedProject(uuid)}
            onEditName={(newName) => updateProjectName(uuid, newName)}
            isSelected={selectedProject === uuid}
          />
        ))}
      </Flex>
    </Flex>
  );
};
