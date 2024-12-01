import React from "react";
import {
  Box,
  Card,
  Heading,
  Text,
  Link,
  Flex,
  ScrollArea,
  Badge,
} from "@radix-ui/themes";
import { getRisk } from "../../risk-helpers";
import { ProjectCardProps } from "./types";

export const ProjectCard: React.FC<ProjectCardProps> = ({
  uuid,
  project,
  version,
  onProjectClick,
}) => {
  const versionRisk = getRisk(version.data.value, "normal");

  return (
    <Card key={uuid} style={{ margin: "10px", minWidth: "550px" }}>
      <Flex direction="row" justify="between">
        <Flex direction="column" gap="2" style={{ flex: 1 }}>
          <ProjectHeader
            name={project.name}
            versionsCount={project.versions.length}
            versionName={version.name}
            onProjectClick={onProjectClick}
          />
          <MetricsSection metrics={version.data.children} />
        </Flex>
        <TQIBadge value={version.data.value} risk={versionRisk} />
      </Flex>
    </Card>
  );
};

const ProjectHeader: React.FC<{
  name: string;
  versionsCount: number;
  versionName: string;
  onProjectClick: () => void;
}> = ({ name, versionsCount, versionName, onProjectClick }) => (
  <Flex direction="row" gap="3" align="center">
    <Link onClick={onProjectClick}>
      <Heading size="3">{name}</Heading>
    </Link>
    <Text size="2" weight="light" style={{ color: "GrayText" }}>
      Most recent of {versionsCount} versions: {versionName}
    </Text>
  </Flex>
);

const MetricsSection: React.FC<{
  metrics: Array<{ name: string; value: number }>;
}> = ({ metrics }) => (
  <Box>
    {/* <ScrollArea scrollbars="horizontal"> */}
    <Flex direction="row" wrap="wrap" gap="2">
      {metrics.map((metric, i) => (
        <MetricItem key={i} name={metric.name} value={metric.value} />
      ))}
    </Flex>
    {/* </ScrollArea> */}
  </Box>
);

const MetricItem: React.FC<{
  name: string;
  value: number;
}> = ({ name, value }) => {
  const childRisk = getRisk(value, "normal");
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      style={{
        gap: "2px",
        border: "0.5px solid var(--gray-6)",
        borderRadius: "5px",
        backgroundColor: childRisk?.color || "gray",
        color: "var(--gray-12)",
      }}
    >
      <Flex justify="center" align="center" pl="2" py="1">
        <Text size="1" style={{ whiteSpace: "nowrap" }}>
          {name}
        </Text>
      </Flex>
      <Flex justify="center" align="center" py="1" px="2">
        <Text size="1">{value.toFixed(2)}</Text>
      </Flex>
    </Flex>
  );
};

const TQIBadge: React.FC<{
  value: number;
  risk: ReturnType<typeof getRisk>;
}> = ({ value, risk }) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    style={{
      background: risk?.color || "gray",
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
        color: risk.badgeColor,
        marginBottom: "4px",
      }}
    >
      TQI
    </Text>
    <Text
      size="6"
      weight="bold"
      style={{
        color: risk.badgeColor,
        lineHeight: "1",
      }}
    >
      {value.toFixed(2)}
    </Text>
  </Flex>
);
