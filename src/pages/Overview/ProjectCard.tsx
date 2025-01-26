import React from "react";
import { Box, Card, Heading, Text, Link, Flex } from "@radix-ui/themes";
import { getRisk } from "../../risk-helpers";
import { ProjectCardProps } from "./types";
import { useState } from "react";
import { LabelledComboBox } from "../../composites/Combobox";
import { Version } from "../../state";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export const ProjectCard: React.FC<ProjectCardProps> = ({
  uuid,
  project,
  onProjectClick,
}) => {
  const [selectedVersionIndex, setSelectedVersionIndex] = useState(
    project.versions.length - 1
  );

  const selectedVersion = project.versions[selectedVersionIndex];
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
        {/* <RadialGraphs metrics={selectedVersion.data.children} />
        <TQIGraph value={selectedVersion.data.value} /> */}
        <TQIBadge value={selectedVersion.data.value} risk={versionRisk} />
      </Flex>
    </Card>
  );
};

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

const TQIGraph: React.FC<{ value: number }> = ({ value }) => {
  const risk = getRisk(value, "normal");

  const chartData = [
    {
      name: "TQI",
      value: value * 100,
    },
  ];

  return (
    <Flex direction="column" align="center" justify="center">
      <Text
        size="4"
        weight="bold"
        style={{
          color: risk.badgeColor,
          textAlign: "center",
        }}
      >
        TQI
      </Text>

      <RadialBarChart
        width={100}
        height={100}
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="60%"
        barSize={8}
        data={chartData}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

        <RadialBar
          dataKey="value"
          background={{ fill: "#f0f0f0" }}
          fill={risk.color}
        />

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontWeight: "bold",
            fill: risk.badgeColor,
          }}
        >
          {value.toFixed(2)}
        </text>
      </RadialBarChart>
    </Flex>
  );
};

const RadialGraphs: React.FC<{
  metrics: Array<{ name: string; value: number }>;
}> = ({ metrics }) => {
  const renderIndividualChart = (metric: { name: string; value: number }) => {
    const getColor = (value: number) => getRisk(value, "normal").color;
    const chartData = [
      {
        name: metric.name,
        value: metric.value * 100,
      },
    ];
    return (
      <Box
        key={metric.name}
        style={{
          textAlign: "center",
          display: "inline-block",
        }}
      >
        <RadialBarChart
          width={75}
          height={75}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="60%"
          barSize={6}
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            background={{ fill: "#f9f9f9" }}
            fill={getColor(metric.value)}
          />
          {/* Centered Value */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="85%"
          >
            {metric.value.toPrecision(2)}
          </text>
        </RadialBarChart>
        <Text size="2">{metric.name}</Text>
      </Box>
    );
  };
  return (
    <Flex
      gap="5"
      justify="center"
      align="center"
      wrap="wrap"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {metrics.map((metric) => renderIndividualChart(metric))}
    </Flex>
  );
};
