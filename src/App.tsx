import "./App.css";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { State } from "./state/core";
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Overview from "./pages/Overview/Overview";
import ProjectDetailsView from "./pages/ProjectDetailsView/ProjectDetailsView";
import { PageHeader } from "./composites/PageHeader";
import { Grid, Box } from "@radix-ui/themes";
import SideMenu from "./composites/SideMenu";
import ProjectComparisonChart from "./pages/ProjectComparisons/CompareProjects";
import * as ScrollArea from "@radix-ui/react-scroll-area";

function DashboardLayout() {
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
            <main>
              <Outlet />
            </main>
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<DashboardLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="projectview/projectid/:projectId/versionid/:versionId" element={<ProjectDetailsView />} />
          <Route path="compare" element={<ProjectComparisonChart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
