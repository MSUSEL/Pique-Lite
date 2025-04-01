import {
  createBrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import ProjectList from "./pages/Overview/ProjectList";
import ProjectDetailsView from "./pages/ProjectDetailsView/ProjectDetailsView";
import NotFound from "./pages/404/404";
import { PageHeader } from "./composites/PageHeader";
import { Grid, Box } from "@radix-ui/themes";
import SideMenu from "./composites/SideMenu";
import ProjectComparisonChart from "./pages/ProjectComparisons/CompareProjects";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import routes from "./routes";

const router = createBrowserRouter(routes);
// TODO: This probably needs to put somewhere else or removed
function DashboardLayout() {
  return (
    <SidebarProvider>
      <SideMenu />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

function App() {
  return (
    <RouterProvidor router={router} />
    // <Routes>
    //   <Route path="/" element={<Landing />} />
    //   <Route path="/*" element={<DashboardLayout />}>
    //     <Route path="overview" element={<ProjectList />} />
    //     <Route path="projectview" element={<ProjectDetailsView />} />
    //     <Route path="compare" element={<ProjectComparisonChart />} />
    //     <Route path="404" element={<NotFound />} />
    //     <Route path="*" element={<Navigate to="/404" replace />} />
    //   </Route>
    // </Routes>
  );
}

export default App;
