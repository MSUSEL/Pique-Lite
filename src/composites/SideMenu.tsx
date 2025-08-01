import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Folder, Home, MoreHorizontal, Plus, Settings, Trash2 } from "lucide-react";
import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import PiqueLogoNoText from "../assets/pique-logo-notext.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { toast } from "sonner";

const sidebarItems = [
  {
    label: "Dashboard",
    href: "/overview",
    icon: Home
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings
  }
];

interface SideMenuProps {
  selectedProjectId?: string | null;
  selectedVersionId?: string | null;
}

const SideMenu: React.FC<SideMenuProps> = () => {
  const { projects, removeProject } = useProjects();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  let currentProjectId = null;
  if (location.pathname.includes("/project/")) {
    currentProjectId = location.pathname.split("/")[2];
  }

  return (
    <Sidebar collapsible="none" className="h-screen">
      <SidebarHeader className="bg-gray-50">
        <span className="align-center flex flex-row justify-center gap-8">
          <a href="/overview">
            <img
              src="https://raw.githubusercontent.com/MSUSEL/msusel-pique-visualizer/refactorZiyi/src/assets/PIQUE_svg.svg"
              className="h-32 w-32"
              alt="Pique Logo"
            />
          </a>
        </span>
      </SidebarHeader>
      <SidebarContent className="bg-gray-50">
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
                Object.entries(projects).map(([uuid, project]) => {
                  const isActive = currentProjectId === uuid;

                  console.log(
                    `isActive: ${isActive}, uuid: ${uuid}, currentProjectId: ${currentProjectId}`
                  );
                  return (
                    <SidebarMenuItem
                      key={uuid}
                      className="last-child:invisible last-child:hover:visible"
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={currentProjectId === uuid}
                      >
                        <Link to={`/project/${uuid}`}>
                          <Folder />
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
                          <DropdownMenuItem
                            onClick={() => {
                              removeProject(uuid);
                              toast.success(
                                `Deleting project "${project.name}"`
                              );
                            }}
                            className="text-sm"
                          >
                            <Trash2 size={1} />
                            <span>Delete Project</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-center px-2 py-8">
          <img
            src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg"
            alt="CISA Logo"
            width="200"
            height="200"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideMenu;
