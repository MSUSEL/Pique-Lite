import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRisk } from "../../composites/RiskHelpers";
import { Version } from "../../state";
import { Badge } from "@radix-ui/themes";

export interface ProjectCardProps {
  uuid: string;
  project: {
    name: string;
    versions: Version[];
  };
  onProjectClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onProjectClick
}) => {
  const latestVersion = project.versions[project.versions.length - 1];

  return (
    <Card className="gap-1 py-2">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span className="cursor-pointer" onClick={onProjectClick}>
            {project.name}
          </span>
          <span className="text-muted-foreground text-sm font-normal">
            Last Modified: {new Date(latestVersion.date).toLocaleDateString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex">
        <MetricsSection metrics={latestVersion.data.children} />
        <TQIBadge
          value={latestVersion.data.value}
          risk={getRisk(latestVersion.data.value, "normal")}
        />
      </CardContent>
    </Card>
  );
};

interface VersionCardProps {
  version: Version;
  title: React.ReactNode;
  onClick: () => void;
}

export const VersionCard: React.FC<VersionCardProps> = ({
  version,
  title,
  onClick
}) => {
  const versionRisk = getRisk(version.data.value, "normal");

  return (
    <Card className="mx-auto my-2.5 w-[90%] cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="flex flex-1 flex-col gap-2">
            <div>{title}</div>
            <p className="text-muted-foreground text-sm">
              Last Modified: {new Date(version.date).toLocaleDateString()}
            </p>
            <MetricsSection metrics={version.data.children} />
          </div>
          <TQIBadge value={version.data.value} risk={versionRisk} />
        </div>
      </CardContent>
    </Card>
  );
};

const MetricsSection: React.FC<{
  metrics: Array<{ name: string; value: number }>;
}> = ({ metrics }) => (
  <div className="flex flex-wrap gap-1">
    {metrics.map((metric) => (
      <MetricItem key={metric.name} name={metric.name} value={metric.value} />
    ))}
  </div>
);

const MetricItem: React.FC<{
  name: string;
  value: number;
}> = ({ name, value }) => {
  const childRisk = getRisk(value, "normal");
  return (
    <Badge
      variant="outline"
      style={{
        padding: 0,
        overflow: "hidden",
        backgroundColor: childRisk?.color || "gray"
      }}
    >
      <span className="px-2 py-1" style={{}}>
        {name}
      </span>
      <span className="px-2 py-1">{value.toFixed(2)}</span>
    </Badge>
  );
};

const TQIBadge: React.FC<{
  value: number;
  risk: ReturnType<typeof getRisk>;
}> = ({ value, risk }) => (
  <div
    className="ml-6 flex min-w-[100px] flex-col items-center justify-center rounded-md p-3"
    style={{
      background: risk?.color || "gray"
    }}
  >
    <span
      className="mb-1 text-sm font-medium"
      style={{
        color: risk.badgeColor
      }}
    >
      TQI
    </span>
    <span
      className="text-2xl leading-none font-bold"
      style={{
        color: risk.badgeColor
      }}
    >
      {value.toFixed(2)}
    </span>
  </div>
);
