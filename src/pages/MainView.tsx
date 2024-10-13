import { Box, Grid, Section } from "@radix-ui/themes";
import { useAtomValue, atom } from "jotai";
import { PageHeader } from "../views/PageHeader";
import { VersionSelector } from "../views/VersionSelector";
import { ProjectSelector } from "../views/ProjectSelector";
import SideBar from "../composites/SideBar";
import Overview from "../composites/Overview";
import CompareView from "../composites/CompareView";
import ProjectCharacteristicsRisks from "../composites/ProjectCharacteristicsRisks";

const content: Record<string, JSX.Element> = {
  overview: <Overview />,
  compare: <CompareView />,
};

export const selectedContentAtom = atom<string>("overview");

function MainView() {
  const selectedContent = useAtomValue(selectedContentAtom);

  return (
    <Box>
      <PageHeader />
      <Grid columns="auto auto" justify="center">
        <SideBar />
        
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

          {/* Items to View */}
          {content[selectedContent]}
        </Box>
      </Grid>
    </Box>
  );
}

export default MainView;
