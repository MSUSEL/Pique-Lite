import { Box, Flex, Text } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllRiskLevels } from "../../composites/RiskHelpers";
import { State } from "../../state";
import { ProjectAttributesChart } from "./ProjectAttributesChart";
import * as ProjectPanel from "./ProjectPanel";
import { RiskLegend } from "./RiskCards";

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

const ProjectCharacteristicsRisks = () => {
  const projects = useAtomValue(State.projects);
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectid");
  const versionId = searchParams.get("versionid");

  //check to make sure there is a selected project
  if (!projectId) return null;
  const project = projects ? projects[projectId] : undefined;

  if (!project) return null;

  const versionIndex = versionId ? parseInt(versionId, 10) : 0;
  const version = project.versions[versionIndex];
  const characteristics = version.data.children;

  const riskCards = characteristics.map(
    (characteristic: { name: string; value: number }) => ({
      title: characteristic.name,
      score: characteristic.value,
    }),
  );

  return <RiskLegend risks={riskCards} scale="normal" />;
};

function ProjectDetailsView() {
  const projectMapping = useAtomValue(State.projects);
  const [searchParams, setURLSearchParameters] = useSearchParams();
  const projectId = searchParams.get("projectid") || "";
  const versionIdParam = searchParams.get("versionid");

  const versionId = useMemo(() => {
    // If versionId is specified and valid, use it
    if (
      versionIdParam &&
      versionIdParam !== "undefined" &&
      versionIdParam !== ""
    ) {
      return parseInt(versionIdParam, 10);
    }

    // Otherwise, compute the default version (last version)
    const lastVersion = projectMapping?.[projectId]?.versions?.length
      ? projectMapping[projectId].versions.length - 1
      : 0;

    return lastVersion;
  }, [versionIdParam, projectId, projectMapping]);

  const projects = useMemo(() => {
    if (!projectMapping) return [];
    return Object.values(projectMapping);
  }, [projectMapping]);

  const selectedProject =
    projects.find((project) => project.uuid === projectId) || null;

  const versions = useMemo(() => {
    if (!selectedProject) return [];
    return selectedProject.versions;
  }, [selectedProject]);

  return (
    <Flex
      className="ProjectDetailsView-root"
      direction="column"
      align="start"
      width="100%"
      height="100%"
      gap="6"
      justify="start"
      style={{
        padding: "1em",
      }}
    >
      <Flex direction="row" width="100%" gap="6">
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
      </Flex>
      <Flex justify="center" direction="row" align="center" gap="6">
        <Text style={{ display: "block", whiteSpace: "nowrap" }}>
          Risk Status
        </Text>
        <ProjectCharacteristicsRisks />
      </Flex>
      <Box>
        <ProjectPanel.Container>
          <ProjectPanel.Title>Characteristics</ProjectPanel.Title>
          <ProjectAttributesChart />
        </ProjectPanel.Container>
      </Box>
    </Flex>
  );
}

export default ProjectDetailsView;
