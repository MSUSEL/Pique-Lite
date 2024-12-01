import { Box, IconButton, Grid, Text } from "@radix-ui/themes";
import { PinLeftIcon, PinRightIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { LinePlot } from "./ProjectDetailsView/ProjectAttributesChart";
import { RiskCards, RiskLegend } from "../composites/RiskCards";
import { getAllRiskLevels } from "../risk-helpers";
import { State } from "../state/core";
import * as OverviewPanel from "../composites/OverviewPanel";
import { VersionSelector } from "../views/VersionSelector";
import { ProjectSelector } from "../views/ProjectSelector";
import { FileUploadDialog } from "../composites/FileUploadDialog";
import * as SideBar from "react-pro-sidebar";
import { useState } from "react";

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

function ProjectView() {
  const selectedProjectId = useAtomValue(State.selectedProject);

  return (
    <Box className="ProjectView-root">
      <Grid columns="auto auto">
        <Box>
          <SideBar.Sidebar collapsedWidth="0px"></SideBar.Sidebar>
        </Box>

        <Box
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // marginLeft: collapsed ? "0vw" : "-20vw",
          }}
        >
          <Box style={{ width: "100%", marginRight: "5vw" }}>
            <ProjectSelector />
          </Box>
          <FileUploadDialog selectedProjectId={selectedProjectId} />
          <VersionSelector />
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0.5vh",
            }}
          >
            <ProjectCharacteristicsRisks />
            <OverviewPanel.Container>
              <OverviewPanel.Title>Characteristics</OverviewPanel.Title>
              <LinePlot />
            </OverviewPanel.Container>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default ProjectView;
