import React from "react";
import { useSetAtom } from "jotai";
import { State } from "../../state";
import {
  Avatar,
  Box,
  Card,
  Heading,
  Text,
  Separator,
  Link,
} from "@radix-ui/themes";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useProjects } from "../../composites/FileUploader/useProjects";
import { Flex } from "@radix-ui/themes";
import { getRisk } from "../../risk-helpers";
import { Version } from "../../state";
import "./Overview.css";

const Overview: React.FC = () => {
  const { projects, selectedProjectId } = useProjects();
  const setCurrentView = useSetAtom(State.currentView);
  const setProject = useSetAtom(State.selectedProject);
  const setVersion = useSetAtom(State.selectedVersion);

  if (!projects || !selectedProjectId) return null;
  const projectArray = Object.entries(projects);

  return (
    <Box>
      <Flex direction="column">
        {projectArray.map(([uuid, project]) => {
          // Find the version with the greatest uploadOrder
          const localVersion = project.versions.reduce(
            (latest: Version | null, version: Version) => {
              return version.uploadOrder > (latest?.uploadOrder || 0)
                ? version
                : latest;
            },
            null
          );

          if (!localVersion) return null;

          const versionRisk = getRisk(localVersion.data.value, "normal");

          return (
            <Card key={uuid} style={{ margin: "10px", width: "70vw" }}>
              <Flex direction="row" gap="2" justify="center">
                <Link
                  onClick={() => {
                    setCurrentView("project");
                    setProject(uuid);
                    setVersion(project.versions.length - 1);
                  }}
                >
                  <Heading size="3">{project.name}</Heading>
                </Link>
                <Text size="2" weight="light" style={{ color: "GrayText" }}>
                  Most recent of {project.versions.length} versions:{" "}
                  {localVersion.name}
                </Text>
              </Flex>
              <ScrollArea.Root>
                <ScrollArea.ScrollAreaViewport>
                  <Flex direction="row" width="100%" gap="9" justify="start">
                    <Flex
                      direction="column"
                      style={{ alignItems: "center", justifySelf: "center" }}
                    >
                      <Text>TQI</Text>
                      <Avatar
                        size="5"
                        fallback={localVersion.data.value.toFixed(2)}
                        style={{ background: versionRisk?.color || "gray" }}
                        highContrast
                      >
                        {versionRisk?.icon}
                      </Avatar>
                    </Flex>

                    <Flex direction="row" gap="3">
                      {localVersion.data.children.map((child, i) => {
                        const childRisk = getRisk(child.value, "normal");
                        return (
                          <Flex direction="row" gap="5" key={i}>
                            <Separator orientation="vertical" size="4" />
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
                          </Flex>
                        );
                      })}
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

export default Overview;
