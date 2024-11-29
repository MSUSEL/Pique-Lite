import "./App.css";
import { useAtomValue } from "jotai";
import { State } from "./state/core";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview/Overview";
import Project from "./pages/Project";
import { PageHeader } from "./views/PageHeader";
import { Grid, Box } from "@radix-ui/themes";
import SideMenu from "./views/SideMenu";

const views: Record<string, JSX.Element> = {
  landing: <Landing />,
  overview: <Overview />,
  project: <Project />,
  //eval page set as overview for now while there is no eval page
  evaluate: <Overview />,
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
      <Box height="100%" width="100%">
        <PageHeader />
        <Grid columns="auto auto" height="100%">
          <SideMenu />
          <Box>
            {/* <MenuToggle collapsed={collapsed} setCollapsed={setCollapsed} /> */}
            {views[view]}
          </Box>
        </Grid>
      </Box>
    );
}

export default App;
