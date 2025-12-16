import {
  createBrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";
import SideMenu from "./composites/SideMenu";

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
