import "./App.css";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { State } from "./state/core";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview/Overview";
import Project from "./pages/Project";
import { PageHeader } from "./views/PageHeader";
import { Grid, Box } from "@radix-ui/themes";
import SideMenu from "./views/SideMenu";
import MenuToggle from "./views/MenuToggle";

const views: Record<string, JSX.Element> = {
  landing: <Landing />,
  overview: <Overview />,
  project: <Project />,
  //eval page set as overview for now while there is no eval page
  evaluate: <Overview />,
};

function App() {
  const view = useAtomValue(State.currentView) || "landing";
  const [collapsed, setCollapsed] = useState(true);

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
        <Grid columns="auto auto">
          <SideMenu collapsed={collapsed} />
          <Box style={{ width: "80vw" }}>
            <MenuToggle collapsed={collapsed} setCollapsed={setCollapsed} />
            {views[view]}
          </Box>
        </Grid>
      </Box>
    );
}

export default App;
