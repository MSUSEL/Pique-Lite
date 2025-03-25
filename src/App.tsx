import "./App.css";
import { useAtomValue } from "jotai";
import { State } from "./state/core";
import Landing from "./pages/Landing/Landing";
import Overview from "./pages/ProjectOverview/Overview";
import ProjectDetailsView from "./pages/ProjectDetailsView/ProjectDetailsView";
import { PageHeader } from "./composites/PageHeader";
import { Grid, Box } from "@radix-ui/themes";
import SideMenu from "./composites/SideMenu";
import ProjectComparisonChart from "./pages/ProjectComparisons/CompareProjects";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import VersionOverview from "./pages/VersionOverview/Overview";
import ListView from "./pages/ListView/ListView";
import TreeView from "./pages/TreeView/TreeView";
import VersionSelector from "./pages/VersionSelector/VersionSelector";
import ImportanceAdjustment from "./pages/ImportanceAdjustment/ImportanceAjustment";

const views: Record<string, JSX.Element> = {
  landing: <Landing />,
  overview: <Overview />,
  project: <ProjectDetailsView />,
  compare: <ProjectComparisonChart />,
  versionselector: <VersionSelector />,
  versionoverview: <VersionOverview />,
  list: <ListView />,
  tree: <TreeView />,
  adjustment: <ImportanceAdjustment />,
};

function App() {
  const view = useAtomValue(State.currentView) || "landing";
  if (view === "landing")
    return (
      <Box height="100%" width="100%">
        {views[view]}
      </Box>
    );
  else
    return (
      <Box
        height="100vh"
        width="100vw"
        className="App-root"
        style={{ overflow: "hidden" }}
      >
        <PageHeader />

        <Grid
          columns="auto 1fr"
          height="72vh"
          width="100%"
          className="App-main-view-area"
        >
          <SideMenu />

          <ScrollArea.Root
            style={{
              height: "100%",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <ScrollArea.Viewport
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              {views[view]}
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              orientation="vertical"
              style={{ width: "10px" }}
            >
              <ScrollArea.Thumb
                style={{
                  background: "#999",
                  borderRadius: "5px",
                }}
              />
            </ScrollArea.Scrollbar>

            <ScrollArea.Scrollbar
              orientation="horizontal"
              style={{ height: "10px" }}
            >
              <ScrollArea.Thumb
                style={{
                  background: "#999",
                  borderRadius: "5px",
                }}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Grid>
      </Box>
    );
}

export default App;
