import "./App.css";
import { useAtomValue } from "jotai";
import { State } from "./state/core";
import Landing from "./pages/Landing/Landing";
import Overview from "./pages/Overview/Overview";
import ProjectDetailsView from "./pages/ProjectDetailsView/ProjectDetailsView";
import { PageHeader } from "./views/PageHeader";
import { Grid, Box } from "@radix-ui/themes";
import SideMenu from "./views/SideMenu";
import ProjectComparisonChart from "./pages/ProjectComparisons/CompareProjects";

const views: Record<string, JSX.Element> = {
  landing: <Landing />,
  overview: <Overview />,
  project: <ProjectDetailsView />,
  compare: <ProjectComparisonChart />,
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
          height="100%"
          width="100%"
          className="App-main-view-area"
        >
          <SideMenu />
          <Box className="App-right-panel">{views[view]}</Box>
        </Grid>
      </Box>
    );
}

export default App;
