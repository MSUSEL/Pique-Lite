import { Box, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import PiqueLogoNoText from "../assets/pique-logo-notext.png";

import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "../components/ui/sidebar";
import { cn } from "../components/lib/utils";

const sidebarItems = [
  {
    label: "Overview",
    href: "/overview",
    icon: Home,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: Calendar,
  },
];
interface SideMenuProps {
  selectedProjectId?: string | null;
  selectedVersionId?: string | null;
}

const SideMenu: React.FC<SideMenuProps> = ({
  selectedProjectId = null,
  selectedVersionId = null,
}) => {
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
              <SidebarMenuItem>
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
        {/* <Link */}
        {/*   to="/overview" */}
        {/*   className={cn( */}
        {/*     "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent", */}
        {/*     "text-muted-foreground hover:text-foreground", */}
        {/*   )} */}
        {/* > */}
        {/*   <HomeIcon className="h-4 w-4" /> */}
        {/*   <span>Overview</span> */}
        {/* </Link> */}

        {/* <Link */}
        {/*   to={`/projectview?projectid=${selectedProjectId}&versionid=${selectedVersionId}`} */}
        {/*   className={cn( */}
        {/*     "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent", */}
        {/*     "text-muted-foreground hover:text-foreground", */}
        {/*   )} */}
        {/* > */}
        {/*   <DashboardIcon className="h-4 w-4" /> */}
        {/*   <span>Project Details</span> */}
        {/* </Link> */}
      </SidebarContent>
    </Sidebar>
  );
};

export default SideMenu;
