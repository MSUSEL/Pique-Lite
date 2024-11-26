import React from "react";
import { Avatar, Box, Card, Heading, Text, Separator } from "@radix-ui/themes";
import { useProjects } from "../composites/FileUploader/useProjects";
import { Flex } from "@radix-ui/themes";
import { getRisk } from "../risk-helpers";

const ProjectPage: React.FC = () => {
  const { projects, selectedProjectId } = useProjects();

  if (!projects || !selectedProjectId) return null;
  const currentProject = projects[selectedProjectId];

  if (!currentProject.versions.length)
    return (
      <Box>
        <Text>Project has no valid versions uploaded.</Text>
      </Box>
    );

  return (
    <Box>
      <Flex direction="column">
        {currentProject.versions.map((version, index) => {
          const versionRisk = getRisk(version.data.value, "normal");
          return (
            <Card key={index} style={{ margin: "10px", width: "70vw" }}>
              <Heading size="3">Version: {version.name}</Heading>
              <Flex key={version.name} direction="row" width="100%">
                <Flex
                  direction="row"
                  gap="5"
                  style={{
                    width: "60%",
                  }}
                >
                  {version.data.children.map((child, i) => {
                    const childRisk = getRisk(child.value, "normal");
                    return (
                      <Flex
                        direction="column"
                        style={{ alignItems: "center" }}
                        key={i}
                      >
                        <Text style={{ textWrap: "nowrap" }}>{child.name}</Text>
                        <Avatar
                          size="5"
                          fallback={child.value.toFixed(2)}
                          style={{ background: childRisk?.color || "gray" }}
                          highContrast
                        />
                      </Flex>
                    );
                  })}
                </Flex>
                <Box style={{ width: "20%" }} />
                <Flex
                  direction="column"
                  style={{ alignItems: "center", width: "20%" }}
                >
                  <Text>TQI</Text>
                  <Avatar
                    size="5"
                    fallback={version.data.value.toFixed(2)}
                    style={{ background: versionRisk?.color || "gray" }}
                    highContrast
                  />
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ProjectPage;
