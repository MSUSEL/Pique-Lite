import { Box, Button, Grid, Text } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { LinePlot } from "../composites/PiqueChart";
import { RiskCards } from "../composites/RiskCards";
import { getAllRiskLevels } from "../risk-helpers";
import { State } from "../state/core";
import * as OverviewPanel from "../composites/OverviewPanel";
import * as SideBar from "react-pro-sidebar";
import { useState } from "react";
import { PageHeader } from "../views/PageHeader";
import { ProjectVersionSelector } from "../views/ProjectVersionSelector";

const RiskLevelLegend = () => {
  const allRisks = getAllRiskLevels();

  return (
    <RiskCards
      risks={allRisks.map((risk) => ({
        title: risk.name,
        score: risk.diagnosticRange[1] - 0.001,
      }))}
      scale="diagnostic"
    />
  );
};

const ProjectCharacteristicsRisks = () => {
  const project = useAtomValue(State.project);
  const selectedVersion = useAtomValue(State.selectedVersion);

  if (!project) return null;

  const version = project.versions[selectedVersion];
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
      <Grid columns="auto auto">
        <Box>
          <SideBar.Sidebar collapsed={collapsed} collapsedWidth="0px">
            <SideBar.Menu>
              <SideBar.MenuItem>
                <Text>Overview</Text>
              </SideBar.MenuItem>
            </SideBar.Menu>
          </SideBar.Sidebar>
        </Box>

        <Box>
          <Button onClick={() => setCollapsed((s) => !s)}> SideBar</Button>
          <ProjectVersionSelector />
          <ProjectCharacteristicsRisks />
          <RiskLevelLegend />
          <OverviewPanel.Container>
            <OverviewPanel.Title>Characteristics</OverviewPanel.Title>
            <LinePlot />
          </OverviewPanel.Container>
        </Box>
      </Grid>
    </Box>
  );
}

export default Overview;
