import { Box, IconButton, Grid, Text, Section } from "@radix-ui/themes";
import { PinLeftIcon, PinRightIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { LinePlot } from "../composites/PiqueChart";
import { LinePlot_Compare } from "../composites/PiqueChart";
import { RiskCards, RiskLegend } from "../composites/RiskCards";
import { getAllRiskLevels } from "../risk-helpers";
import { State } from "../state/core";
import * as OverviewPanel from "../composites/OverviewPanel";
import * as ComparePanel from "../composites/ComparePanel";
import * as SideBar from "react-pro-sidebar";
import { useState } from "react";
import { PageHeader } from "../views/PageHeader";
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

function Overview() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Box>
      <PageHeader />
      <Grid columns="auto auto" justify="center">

        {/* SideBar content */}
        <Box> 
          <IconButton
            size="3"
            variant="soft"
            style={{
              position: "absolute",
              top: "10vh",
              left: collapsed ? "10px" : "260px",
              zIndex: 2,
              transition: "left 0.3s ease-in-out",
            }}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <PinLeftIcon /> : <PinRightIcon />}
          </IconButton>
          <SideBar.Sidebar collapsed={collapsed} collapsedWidth="0px">
            <SideBar.Menu>
              <SideBar.MenuItem>
                <Text>Overview</Text>
              </SideBar.MenuItem>
              <SideBar.MenuItem>
                <Text>Evaluate</Text>
              </SideBar.MenuItem>
            </SideBar.Menu>
          </SideBar.Sidebar>
        </Box>
        
        {/* Main content */}
        <Box style={{ width: "80vw", padding: '0 2vw' }}>
          
          {/* Selectors */}
          <Section style={{ padding: "0" }}>
            <Grid columns="auto auto auto" justify="between">
              <ProjectSelector />
              <VersionSelector />
            </Grid>
          </Section>
          
          {/* Risk Icons */}
          <ProjectCharacteristicsRisks/>

          {/* Risk Plot */}
          <OverviewPanel.Container>
            <OverviewPanel.Title>Characteristics</OverviewPanel.Title>
            <LinePlot />
          </OverviewPanel.Container>

          {/* temporary comparison part*/}
          <OverviewPanel.Container>
            <OverviewPanel.Title>Compare Projects</OverviewPanel.Title>
            <LinePlot_Compare />
          </OverviewPanel.Container>
        </Box>
      </Grid>
    </Box>
  );
}

export default Overview;
