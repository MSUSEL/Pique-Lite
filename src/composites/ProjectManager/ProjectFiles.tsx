import { Box, Button, Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";
import { ProjectFileList } from "./ProjectFileList";
import { useProjectManager } from "./ProjectManagerContext";

export const ProjectFiles = () => {
  const {
    projects,
    selectedProject,
    selectFiles,
    invalidFiles,
    removeVersionFromProject,
    renderAfterFiles,
  } = useProjectManager();

  const currentProjectVersions = selectedProject
    ? projects?.[selectedProject]?.versions ?? []
    : [];

  const handleRemoveVersion = (fileName: string) => {
    if (selectedProject) {
      removeVersionFromProject(selectedProject, fileName);
    }
  };

  return (
    <Flex direction="column" height="100%">
      <ScrollArea style={{ height: "100%" }}>
        <Box p="4">
          {!Object.keys(projects || {}).length ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="4"
              py="9"
            >
              <Text size="5" weight="bold" color="gray">
                No projects added yet
              </Text>
              <Text size="2" color="gray">
                Add a new project to get started
              </Text>
            </Flex>
          ) : (
            <>
              <Flex
                direction="row"
                justify="between"
                align="center"
                gap="3"
                mb="4"
              >
                <Heading size="2" style={{ color: "var(--slate-11)" }}>
                  Manage Project Files
                </Heading>
                <Button
                  size="1"
                  variant="surface"
                  onClick={selectFiles}
                  disabled={!selectedProject}
                >
                  Add Files
                </Button>
              </Flex>
              <ProjectFileList
                versions={currentProjectVersions}
                invalidFiles={invalidFiles}
                onRemoveVersion={handleRemoveVersion}
              />
            </>
          )}
        </Box>
      </ScrollArea>
      {renderAfterFiles}
    </Flex>
  );
};
