import React from "react";
import { Home, Calendar, Plus, MoreHorizontal } from "lucide-react";
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
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";
import { useProjects } from "./FileUploader/hooks/use-projects";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <Sidebar variant="sidebar">
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
                  <SidebarMenuItem
                    key={uuid}
                    className="last-child:invisible last-child:hover:visible"
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={currentProjectId === uuid}
                    >
                      <Link to={`/dashboard/project/${uuid}`}>
                        {project.name}
                      </Link>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <SidebarMenuAction asChild>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal />
                        </DropdownMenuTrigger>
                      </SidebarMenuAction>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <span>Edit Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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
