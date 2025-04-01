import React from "react";
import { Home, Calendar, Plus } from "lucide-react";
import PiqueLogoNoText from "../assets/pique-logo-notext.png";
import { Link, useSearchParams } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";
import { useProjects } from "./FileUploader/hooks/use-projects";

const sidebarItems = [
  {
    label: "Projects",
    href: "/dashboard/overview",
    icon: Home,
  },
];

interface SideMenuProps {
  selectedProjectId?: string | null;
  selectedVersionId?: string | null;
}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { projects } = useProjects();
  const [searchParams] = useSearchParams();
  const currentProjectId = searchParams.get("projectid");

  return (
    <Sidebar side="left" variant="sidebar" className="h-full">
      <SidebarHeader>
        <span className="flex flex-row justify-left align-center gap-8">
          <img src={PiqueLogoNoText} className="h-16 " alt="Pique Logo" />
          <h2 className="flex flex-col justify-center align-center text-lg">
            Pique
          </h2>
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <Link to={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>

          {/* TODO: Hook up action to create new project */}
          <SidebarGroupAction asChild>
            <Plus />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects &&
                Object.entries(projects).map(([uuid, project]) => (
                  <SidebarMenuItem key={uuid}>
                    <SidebarMenuButton
                      asChild
                      isActive={currentProjectId === uuid}
                    >
                      <Link to={`/dashboard/project/${uuid}`}>
                        {project.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideMenu;
