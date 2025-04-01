import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../components/ui/sidebar";
import SideMenu from "../composites/SideMenu";
import { SidebarTrigger } from "../components/ui/sidebar";

export default function DashboardLayout() {
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