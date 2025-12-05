import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { getAllRiskLevels, getRisk, useRiskColor } from "../../composites/RiskHelpers";
import { useRiskLevelSettings } from "../../composites/RiskLevelSettings";
import { State } from "../../state";
import { ProjectAttributesChart } from "./ProjectAttributesChart";
import { RiskLegend } from "./RiskCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ProjectVersionsProvider,
  ProjectVersionsTable
} from "./VersionTableNew";
import { Calendar, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TQIBadge } from "../ProjectOverview/ProjectCard";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const RiskLevelLegend = () => {
  const { riskLevelRanges } = useRiskLevelSettings();
  const allRisks = getAllRiskLevels(riskLevelRanges);

  return (
    <RiskLegend
      risks={allRisks.map((risk) => ({
        title: risk.name,
        score: risk.normalRange[1] - 0.001,
        riskLevelName: risk.name.toLowerCase() as 'severe' | 'high' | 'elevated' | 'guarded' | 'low'
      }))}
      scale="normal"
    />
  );
};

/**
 * Formats a Date object to "DD MMM YYYY" format (e.g., "02 Dec 2025")
 * @param date - The Date object to format
 * @returns The formatted date string
 */
function formatDate(date: Date): string {
  // Get the day and add leading zero if needed
  const day = date.getDate().toString().padStart(2, "0");

  // Get the month name
  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const monthName = monthNames[date.getMonth()];

  // Get the year
  const year = date.getFullYear();

  // Return the formatted date
  return `${day} ${monthName} ${year}`;
}

const ProjectCharacteristicsRisks = ({ projectId }: { projectId: string }) => {
  const projects = useAtomValue(State.projects);

  //check to make sure there is a selected project
  if (!projectId) return null;
  const project = projects ? projects[projectId] : undefined;

  if (!project) return null;

  const versionIndex = 0; // Default to first version for now
  const version = project.versions[versionIndex];
  const characteristics = version.data.children;

  const riskCards = characteristics.map(
    (characteristic: { name: string; value: number }) => ({
      title: characteristic.name,
      score: characteristic.value
    })
  );

  return <RiskLegend risks={riskCards} scale="normal" />;
};

interface ProjectDetailsViewProps {
  projectId: string;
}

function ProjectDetailsView({ projectId }: ProjectDetailsViewProps) {
  const projectMapping = useAtomValue(State.projects);
  const { getRiskColor } = useRiskColor();

  const projects = useMemo(() => {
    if (!projectMapping) return [];
    return Object.values(projectMapping);
  }, [projectMapping]);

  const selectedProject =
    projects.find((project) => project.uuid === projectId) || null;

  if (!selectedProject || !selectedProject.versions.length) return null;

  const latestVersion =
    selectedProject.versions[selectedProject.versions.length - 1];
  const riskCards = latestVersion.data.children.map(
    (characteristic: { name: string; value: number }) => ({
      title: characteristic.name,
      score: characteristic.value
    })
  );
  const tqiRisk = getRisk(latestVersion.data.value, "normal");
  return (
    <div className="project-details-view flex flex-1 min-h-0 flex-col">
      <div className="border-b-[1px] border-gray-200 px-4 py-2 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2 text-gray-700">
          <Folder />
          <h1 className="text-left text-2xl font-bold text-gray-700">
            {selectedProject.name}
          </h1>
        </div>
        <span className="align-center inline-flex items-center gap-1 text-sm font-light text-gray-500">
          <Calendar size={14} />
          {formatDate(
            selectedProject.versions[selectedProject.versions.length - 1].date
          )}
        </span>
      </div>
      <Tabs
        defaultValue="overview"
        className="flex flex-col flex-1 min-h-0 overflow-hidden"
      >
        <TabsList className="tabs-list flex-start flex w-full justify-start rounded-none bg-gray-50 p-0 flex-shrink-0">
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="overview"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="flex-0 rounded-none text-gray-500 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-800"
            value="versions"
          >
            Version Details
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-y-auto px-4">
          <TabsContent
            value="overview"
            className="grid grid-cols-1 lg:grid-cols-5 gap-4 m-0"
          >
              <Card className="m-0 gap-1 py-2 lg:col-span-1">
                <CardHeader>
                  <CardTitle>Security Attributes</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-center justify-center">
                    <div
                      className="flex min-w-[80px] flex-col items-center justify-center rounded-md p-2"
                      style={{
                        background: getRiskColor(latestVersion.data.value, "background", "normal")
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
                        {latestVersion.data.value.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {latestVersion.data.children.map((c) => {
                      return (
                        <div key={c.name} className="flex flex-col">
                          <div className="flex items-center justify-between gap-2 text-sm font-light">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="truncate whitespace-nowrap">
                                  {c.name}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>{c.name}</TooltipContent>
                            </Tooltip>
                            <span className="flex-shrink-0">{c.value.toFixed(2)}</span>
                          </div>
                          <Progress
                            value={c.value * 100}
                            bg={getRiskColor(c.value, "background", "normal")}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              <div className="lg:col-span-4">
                <ProjectAttributesChart projectId={projectId} />
              </div>
            </TabsContent>
            <TabsContent value="versions" className="m-0">
              <ProjectVersionsProvider
                projectId={projectId}
                versions={selectedProject.versions}
              >
                <ProjectVersionsTable />
              </ProjectVersionsProvider>
            </TabsContent>
          </div>
        </Tabs>
    </div>
  );
}

export default ProjectDetailsView;
