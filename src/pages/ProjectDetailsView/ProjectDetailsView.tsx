import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { getAllRiskLevels } from "../../composites/RiskHelpers";
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

export const RiskLevelLegend = () => {
  const allRisks = getAllRiskLevels();

  return (
    <RiskLegend
      risks={allRisks.map((risk) => ({
        title: risk.name,
        score: risk.diagnosticRange[1] - 0.001
      }))}
      scale="diagnostic"
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

  const projects = useMemo(() => {
    if (!projectMapping) return [];
    return Object.values(projectMapping);
  }, [projectMapping]);

  const selectedProject =
    projects.find((project) => project.uuid === projectId) || null;

  if (!selectedProject || !selectedProject.versions.length) return null;

  return (
    <div className="project-details-view">
      <div className="grid grid-rows-[auto_auto_1fr]">
        <div className="border-b-[1px] border-gray-200 px-4 py-2 shadow-sm">
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
        <Tabs defaultValue="overview">
          <TabsList className="tabs-list flex-start flex w-full justify-start rounded-none bg-gray-50 p-0">
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
          <div className="px-4">
            <TabsContent value="overview">
              <Card className="gap-1 py-2">
                <CardHeader>
                  <CardTitle className="text-left text-xl">
                    Characteristics
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-1">
                  <ProjectAttributesChart projectId={projectId} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="versions">
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
    </div>
  );
}

export default ProjectDetailsView;
