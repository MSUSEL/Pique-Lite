import { PlusIcon } from "@radix-ui/react-icons";
import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Button,
  Table,
  Text,
} from "@radix-ui/themes";
import { useProjectImport } from "./useProjectImport";
import { ProjectListItem } from "./ProjectListItem";

export const ProjectManager = () => {
  const {
    projects,
    selectedProject,
    setSelectedProject,
    createNewProject,
    updateProjectName,
    selectFiles,
    invalidFiles,
  } = useProjectImport();

  const currentProjectVersions = selectedProject
    ? projects?.[selectedProject]?.versions ?? []
    : [];

  return (
    <Grid columns="1fr 3fr" className="ProjectManager-root" height="100%">
      <Box
        p="4"
        style={{
          backgroundColor: "var(--gray-2)",
          borderRight: "1px solid var(--gray-6)",
        }}
      >
        <Flex direction="row" justify="between" align="center" gap="3">
          <Heading>Projects</Heading>
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
      </Box>
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
            <Heading>Manage Project Files</Heading>
            <Button onClick={selectFiles} disabled={!selectedProject}>
              Select Files
            </Button>
            {!currentProjectVersions?.length && !invalidFiles.length ? (
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap="4"
                py="9"
              >
                <Text size="5" weight="bold" color="gray">
                  No files in project
                </Text>
                <Text size="2" color="gray">
                  Click "Select Files" to add files to this project
                </Text>
              </Flex>
            ) : (
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                      Last Modified
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {currentProjectVersions.map((version) => (
                    <Table.Row key={version.fileName}>
                      <Table.Cell>{version.fileName}</Table.Cell>
                      <Table.Cell>
                        {version.date.toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>Valid</Table.Cell>
                    </Table.Row>
                  ))}
                  {selectedProject &&
                    invalidFiles.map((file) => (
                      <Table.Row key={file.name}>
                        <Table.Cell>{file.name}</Table.Cell>
                        <Table.Cell>-</Table.Cell>
                        <Table.Cell style={{ color: "var(--red-9)" }}>
                          {file.reason}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table.Root>
            )}
          </>
        )}
      </Box>
    </Grid>
  );
};
