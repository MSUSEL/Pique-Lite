import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRisk, getRiskColorVar, useRiskColor } from "../../composites/RiskHelpers";
import { Version } from "../../state";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Clock, Folder, GitBranch } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/components/lib/utils";

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
    <Card className="max-w-[max-content] gap-1 py-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-4">
          <span className="cursor-pointer" onClick={onProjectClick}>
            <span className="flex items-center gap-2 text-gray-700">
              <Folder size="16px" />
              {project.name}
            </span>
          </span>
          <span className="flex justify-end gap-4">
            <span className="text-muted-foreground flex items-center gap-1 text-sm font-normal">
              <Calendar size="16px" />
              <span className="flex items-center">
                {
                  // new Date(latestVersion.date).toLocaleDateString()
                  format(latestVersion.date, "LLL dd, y")
                }
              </span>
            </span>
            <span className="align-self-end text-muted-foreground flex items-center gap-1 text-sm font-normal">
              <Clock size="16px" />
              {project.versions.length}
            </span>
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
    <Card
      className="mx-auto my-2.5 w-[min-content] cursor-pointer"
      onClick={onClick}
    >
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
}> = ({ metrics }) => {
  const { getRiskColor } = useRiskColor();
  
  return (
    <div className="grid grid-cols-2 grid-rows-3 gap-2 md:grid-cols-3 md:grid-rows-2">
      {metrics.map((metric) => (
        // <MetricItem key={metric.name} name={metric.name} value={metric.value} />
        <div>
          <span className="flex items-center justify-between text-sm text-gray-600">
            <span className="truncate whitespace-nowrap">{metric.name}</span>
            <span>{metric.value.toFixed(2)}</span>
          </span>
          <Progress
            value={metric.value * 100}
            className="rounded-md bg-gray-100"
            bg={getRiskColor(metric.value, "background", "normal")}
          />
        </div>
      ))}
    </div>
  );
};

const MetricItem: React.FC<{
  name: string;
  value: number;
}> = ({ name, value }) => {
  const childRisk = getRisk(value, "normal");
  return (
    <Badge
      variant="outline"
      className="max-h-[max-content]"
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

export const TQIBadge: React.FC<{
  value: number;
  risk: ReturnType<typeof getRisk>;
}> = ({ value, risk }) => {
  const { getRiskColor } = useRiskColor();
  
  return (
    <div
      className="ml-6 flex min-w-[80px] flex-col items-center justify-center rounded-md p-3"
      style={{
        background: getRiskColor(value, "background", "normal")
      }}
    >
      <span
        className="mb-1 text-sm font-medium"
        style={{
          color: "white"
        }}
      >
        TQI
      </span>
      <span
        className="text-xl leading-none font-bold"
        style={{
          color: "white"
        }}
      >
        {value.toFixed(2)}
      </span>
    </div>
  );
};
