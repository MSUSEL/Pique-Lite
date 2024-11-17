import React from "react";
import { Avatar, Box, Card, Heading, Text, Separator } from "@radix-ui/themes";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useProjects } from "../../composites/FileUploader/useProjects";
import { Flex } from "@radix-ui/themes";
import { getRisk } from "../../risk-helpers";
import { Version } from "../../state";
import "./Projects.css";

const ProjectsPage: React.FC = () => {
  const { projects, selectedProjectId } = useProjects();

  if (!projects || !selectedProjectId) return null;
  const projectArray = Object.entries(projects);

  return (
    <Box>
      <Flex direction="column">
        {projectArray.map(([uuid, project]) => {
          // Find the version with the greatest uploadOrder
          const selectedVersion = project.versions.reduce(
            (latest: Version | null, version: Version) => {
              return version.uploadOrder > (latest?.uploadOrder || 0)
                ? version
                : latest;
            },
            null
          );

          if (!selectedVersion) return null;

          const versionRisk = getRisk(selectedVersion.data.value, "normal");

          return (
            <Card key={uuid} style={{ margin: "10px", width: "70vw" }}>
              <Flex direction="row" gap="2">
                <Heading size="3">{project.name}</Heading>
                <Text size="2" weight="light" style={{ color: "GrayText" }}>
                  Most recent of {project.versions.length} versions
                </Text>
              </Flex>
              <ScrollArea.Root>
                <ScrollArea.ScrollAreaViewport>
                  <Flex direction="row" width="100%" gap="9" justify="start">
                    <Flex direction="row" gap="3">
                      {selectedVersion.data.children.map((child, i) => {
                        const childRisk = getRisk(child.value, "normal");
                        return (
                          <Flex direction="row" gap="5" key={i}>
                            <Flex
                              direction="column"
                              style={{ alignItems: "center" }}
                            >
                              <Text style={{ textWrap: "nowrap" }}>
                                {child.name}
                              </Text>
                              <Avatar
                                size="3"
                                fallback={child.value.toFixed(2)}
                                style={{
                                  background: childRisk?.color || "gray",
                                }}
                                highContrast
                              />
                            </Flex>
                            <Separator orientation="vertical" size="4" />
                          </Flex>
                        );
                      })}
                    </Flex>
                    <Flex
                      direction="column"
                      style={{ alignItems: "center", justifySelf: "center" }}
                    >
                      <Text>TQI</Text>
                      <Avatar
                        size="5"
                        fallback={selectedVersion.data.value.toFixed(2)}
                        style={{ background: versionRisk?.color || "gray" }}
                        highContrast
                      >
                        {versionRisk?.icon}
                      </Avatar>
                    </Flex>
                  </Flex>
                </ScrollArea.ScrollAreaViewport>
                <ScrollArea.ScrollAreaScrollbar
                  orientation="horizontal"
                  className="ScrollAreaScrollbar"
                >
                  <ScrollArea.ScrollAreaThumb />
                </ScrollArea.ScrollAreaScrollbar>
              </ScrollArea.Root>
            </Card>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ProjectsPage;
