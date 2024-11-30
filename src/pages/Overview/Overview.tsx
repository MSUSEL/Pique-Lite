import React from "react";
import { useSetAtom } from "jotai";
import { State } from "../../state";
import {
  Avatar,
  Box,
  Card,
  Heading,
  Text,
  Link,
  Flex,
  ScrollArea,
} from "@radix-ui/themes";
import { useProjects } from "../../composites/FileUploader/useProjects";
import { getRisk } from "../../risk-helpers";
import { Version } from "../../state";
import "./Overview.css";

const ProjectCard = ({
  uuid,
  project,
  version,
  onProjectClick,
}: {
  uuid: string;
  project: { name: string; versions: Version[] };
  version: Version;
  onProjectClick: () => void;
}) => {
  const versionRisk = getRisk(version.data.value, "normal");

  return (
    <Card key={uuid} style={{ margin: "10px", width: "100%" }}>
      <Flex direction="row" justify="between">
        <Flex direction="column" gap="3" style={{ flex: 1 }}>
          {/* Header Section */}
          <Flex direction="row" gap="3" align="center">
            <Link onClick={onProjectClick}>
              <Heading size="3">{project.name}</Heading>
            </Link>
            <Text size="2" weight="light" style={{ color: "GrayText" }}>
              Most recent of {project.versions.length} versions: {version.name}
            </Text>
          </Flex>

          {/* Child Metrics Section */}
          <Box>
            <ScrollArea scrollbars="horizontal">
              <Flex direction="row">
                {version.data.children.map((child, i) => {
                  const childRisk = getRisk(child.value, "normal");
                  return (
                    <Flex
                      key={i}
                      direction="column"
                      align="center"
                      style={{
                        minWidth: "120px",
                        padding: "8px 16px",
                        gap: "8px",
                      }}
                    >
                      <Text size="2" weight="medium">
                        {child.name}
                      </Text>
                      <Avatar
                        size="2"
                        fallback={child.value.toFixed(2)}
                        style={{
                          background: childRisk?.color || "gray",
                          width: "45px",
                          height: "24px",
                          borderRadius: "4px",
                        }}
                        highContrast
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </ScrollArea>
          </Box>
        </Flex>

        {/* TQI Badge */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            background: versionRisk?.color || "gray",
            padding: "12px 24px",
            borderRadius: "4px",
            marginLeft: "24px",
            minWidth: "100px",
          }}
        >
          <Text
            size="2"
            weight="medium"
            style={{
              color: versionRisk.badgeColor,
              marginBottom: "4px",
            }}
          >
            TQI
          </Text>
          <Text
            size="6"
            weight="bold"
            style={{
              color: versionRisk.badgeColor,
              lineHeight: "1",
            }}
          >
            {version.data.value.toFixed(2)}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

const Overview: React.FC = () => {
  const { projects, selectedProjectId } = useProjects();
  const setCurrentView = useSetAtom(State.currentView);
  const setProject = useSetAtom(State.selectedProject);
  const setVersion = useSetAtom(State.selectedVersion);
  if (!projects || !selectedProjectId) return null;

  return (
    <Box className="Overview-root">
      <Flex direction="column">
        {Object.entries(projects).map(([uuid, project]) => {
          if (project.versions.length === 0) return null;
          return (
            <ProjectCard
              key={uuid}
              uuid={uuid}
              project={project}
              version={project.versions[project.versions.length - 1]}
              onProjectClick={() => {
                setCurrentView("project");
                setProject(uuid);
                setVersion(project.versions.length - 1);
              }}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default Overview;
