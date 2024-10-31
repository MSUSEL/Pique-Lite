import React from 'react';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text, Separator, Card } from '@radix-ui/themes';
import { Project } from "../../state/core";

interface ProjectSelectorProps {
    projects: Project[];
    editingProjectID: string;
    onRemove: (id: string) => void;
    onSelect: (id: string) => void;
}

const ProjectSelectorProps: React.FC<ProjectSelectorProps> = ({ projects, editingProjectID, onRemove, onSelect }) => {
    return (
        <Card variant="surface" size="3" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Flex direction="column" gap="4" padding="4">
          <Text as="h2" size="4" weight="bold">
            Uploaded Projects
          </Text>
  
          {projects.length === 0 ? (
            <Text size="2" color="gray">
              No projects available.
            </Text>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {projects.map((project) => (
                <li key={project.id}>
                  <Flex
                    align="center"
                    justify="between"
                    padding="2"
                    style={{
                      backgroundColor: project.id === editingProjectID ? '#ffff26' : '#f1f1f1',
                      borderRadius: '8px',
                      marginBottom: '8px',
                    }}
                  >
                    <Button
                      variant="surface"
                      size="2"
                      onClick={() => {
                        console.log(`Editing project: ${project.name} (ID: ${project.id}`);
                        onSelect(project.id);
                      }}
                      aria-label={`Edit ${project.name}`}
                      radius="full"
                    >
                      <Pencil1Icon />
                    </Button>
                    <Flex align="center" gap="2">
                      <Text size="3" weight="medium">
                        {project.name}
                      </Text>
                    </Flex>
                    <Button
                      variant="surface"
                      size="2"
                      onClick={() => {
                        console.log(`Removing project: ${project.name} (ID: ${project.id}`);
                        onRemove(project.id);
                      }}
                      aria-label={`Remove ${project.name}`}
                      radius="full"
                    >
                      <TrashIcon />
                    </Button>
                  </Flex>
                  <Separator />
                </li>
              ))}
            </ul>
          )}
        </Flex>
      </Card>        
    );
};

