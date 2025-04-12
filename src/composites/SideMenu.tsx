import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Home, MoreHorizontal, Plus } from "lucide-react";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import PiqueLogoNoText from "../assets/pique-logo-notext.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from "../components/ui/sidebar";
import { useProjects } from "./FileUploader/hooks/use-projects";
import { Button } from "@/components/ui/button";
import { ProjectManagerDialog } from "./ProjectManager/ProjectManagerDialog";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/overview",
    icon: Home
  }
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
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <span className="justify-left align-center flex flex-row gap-8">
          <img src={PiqueLogoNoText} className="h-16" alt="Pique Logo" />
          <h2 className="align-center flex flex-col justify-center text-lg">
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
          <SidebarGroupAction>
            <ProjectManagerDialog>
              <Plus />
            </ProjectManagerDialog>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects &&
                Object.entries(projects).map(([uuid, project]) => (
                  <SidebarMenuItem
                    key={uuid}
                    className="last-child:invisible last-child:hover:visible"
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={currentProjectId === uuid}
                    >
                      <Link to={`/project/${uuid}`}>{project.name}</Link>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <SidebarMenuAction asChild>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                      </SidebarMenuAction>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => {
                            // TODO: Remvoe project
                          }}
                        >
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
