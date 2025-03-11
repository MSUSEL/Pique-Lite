import React, { useEffect } from "react";
import { Box, Card, Heading, Text, Link, Flex } from "@radix-ui/themes";
import { getRisk } from "../../composites/RiskHelpers";
import { ProjectCardProps } from "./types";
import { useState } from "react";
import { LabelledComboBox } from "../../composites/Combobox";
import { Version } from "../../state";

export const ProjectCard: React.FC<ProjectCardProps> = ({
  uuid,
  project,
  onProjectClick,
}) => {
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(
    project.versions.length - 1
  );

  useEffect(() => {
    setSelectedVersionIndex((prevIndex) => {
      const newLength = project.versions.length;
      if (newLength === 0) return 0;
      return Math.min(prevIndex, newLength - 1); // Ensure the index is within bounds
    });
  }, [project.versions.length]);

  const selectedVersion =
    project.versions[selectedVersionIndex] ||
    project.versions[project.versions.length - 1];
  const versionRisk = getRisk(selectedVersion.data.value, "normal");

  return (
    <Card
      key={uuid}
      style={{ margin: "10px", minWidth: "550px", maxWidth: "1024px" }}
    >
      <Flex direction="row" justify="between">
        <Flex direction="column" gap="2" style={{ flex: 1 }}>
          <ProjectHeader
            name={project.name}
            versions={project.versions}
            selectedVersionIndex={selectedVersionIndex}
            onVersionChange={setSelectedVersionIndex}
            onProjectClick={() => onProjectClick(selectedVersionIndex)}
          />
          <MetricsSection metrics={selectedVersion.data.children} />
        </Flex>
        <TQIBadge value={selectedVersion.data.value} risk={versionRisk} />
      </Flex>
    </Card>
  );
};

//Header containing link to project view and version selector
const ProjectHeader: React.FC<{
  name: string;
  versions: Array<Version>;
  selectedVersionIndex: number;
  onVersionChange: (versionIndex: number) => void;
  onProjectClick: () => void;
}> = ({
  name,
  versions,
  selectedVersionIndex,
  onVersionChange,
  onProjectClick,
}) => {
  const selectedVersion = versions[selectedVersionIndex];

  return (
    <Flex direction="row" gap="3" align="center">
      <Link onClick={onProjectClick}>
        <Heading size="3">{name}</Heading>
      </Link>
      <LabelledComboBox
        label="Version:"
        options={versions}
        value={selectedVersion}
        onChange={(version) =>
          onVersionChange(versions.findIndex((v) => v === version))
        }
        placeholder="Select a version"
        renderOption={(option) => option.name}
        getOptionLabel={(option) => option.name}
      />
    </Flex>
  );
};

//Set of colored badges for child data
const MetricsSection: React.FC<{
  metrics: Array<{ name: string; value: number }>;
}> = ({ metrics }) => (
  <Box>
    <Flex direction="row" wrap="wrap" gap="2">
      {metrics.map((metric, i) => (
        <MetricItem key={i} name={metric.name} value={metric.value} />
      ))}
    </Flex>
  </Box>
);

//Individual badges for child data
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
      gap="9"
      style={{
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

//Badge for TQI data
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
