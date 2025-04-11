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
  TableRow,
} from "@/components/ui/table";

export const RiskLevelLegend = () => {
  const allRisks = getAllRiskLevels();

  return (
    <RiskLegend
      risks={allRisks.map((risk) => ({
        title: risk.name,
        score: risk.diagnosticRange[1] - 0.001,
      }))}
      scale="diagnostic"
    />
  );
};

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
      score: characteristic.value,
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
    <div className="project-details-view bg-white rounded-lg padding px-8">
      <div className="grid grid-rows-[auto_auto_1fr] gap-6">
        <h1 className="text-4xl font-bold text-left">{selectedProject.name}</h1>
        {/* <ProjectPanel.Container>
          <ProjectAttributesChart projectId={projectId} />
        </ProjectPanel.Container> */}
        <Tabs defaultValue="overview">
          <TabsList className="tabs-list border-solid border-b-2 border-gray-200">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="versions">Version Details</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-left text-2xl">
                    Characteristics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProjectAttributesChart projectId={projectId} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="versions">
            <Table>
              <TableCaption>
                A list of all versions for this project.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Version</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedProject.versions.map((version, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {version.name}
                    </TableCell>
                    <TableCell>{version.date.toLocaleDateString()}</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell className="text-right">
                      {version.data.value.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      {/* Keeping the commented out code for future reference */}
      {/* <div className="flex flex-row w-full gap-6"> */}
      {/* <LabelledComboBox */}
      {/*   label="Project" */}
      {/*   getOptionKey={(project) => project.uuid} */}
      {/*   getOptionLabel={(project) => project.name} */}
      {/*   options={projects} */}
      {/*   value={selectedProject} */}
      {/*   onChange={(project) => { */}
      {/*     const newProjectId = project?.uuid || ""; */}
      {/*     setURLSearchParameters({ projectid: newProjectId, versionid: "" }); */}
      {/*   }} */}
      {/* /> */}
      {/* <LabelledComboBox */}
      {/*   label="Version" */}
      {/*   options={versions} */}
      {/*   value={versions[versionId]! || undefined} */}
      {/*   getOptionKey={(version) => version.name} */}
      {/*   getOptionLabel={(version) => version.name} */}
      {/*   onChange={(version) => { */}
      {/*     const newVersionId = version */}
      {/*       ? versions.indexOf(version).toString() */}
      {/*       : ""; */}
      {/*     setURLSearchParameters({ */}
      {/*       projectid: projectId, */}
      {/*       versionid: newVersionId, */}
      {/*     }); */}
      {/*   }} */}
      {/* /> */}
      {/* </div> */}
    </div>
  );
}

export default ProjectDetailsView;
