import { Box } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { LinePlot } from "../composites/PiqueChart";
import { RiskCards, RiskLegend } from "../composites/RiskCards";
import { getAllRiskLevels } from "../risk-helpers";
import { State } from "../state/core";
import * as OverviewPanel from "../composites/OverviewPanel";
import { VersionSelector } from "../views/VersionSelector";
import { ProjectSelector } from "../views/ProjectSelector";

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
  const selectedProject = useAtomValue(State.selectedProject);

  //check to make sure there is a selected project
  if (!selectedProject) return null;
  const project = projects ? projects[selectedProject] : undefined;

  const selectedVersion = useAtomValue(State.selectedVersion);

  if (!project) return null;

  const version =
    project.versions[selectedVersion == undefined ? 0 : selectedVersion];
  const characteristics = version.data.children;

  const riskCards = characteristics.map(
    (characteristic: { name: string; value: number }) => ({
      title: characteristic.name,
      score: characteristic.value,
    })
  );

  return <RiskCards risks={riskCards} />;
};

const Project = () => {
  return (
    <Box style={{ width: "80vw" }}>
      <ProjectSelector />
      <VersionSelector />
      <ProjectCharacteristicsRisks />
      <OverviewPanel.Container>
        <OverviewPanel.Title>Characteristics</OverviewPanel.Title>
        <LinePlot />
      </OverviewPanel.Container>
    </Box>
  );
};

export default Project;
