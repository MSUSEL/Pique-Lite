import { Box, Text } from "@radix-ui/themes";
import * as SideBar from "react-pro-sidebar";
import { useSetAtom } from "jotai";
import { State } from "../state";
import React, { useState } from "react";
import { HomeIcon, DashboardIcon , MixIcon } from "@radix-ui/react-icons"; // Replace with actual icons

interface SideMenuProps {
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const setCurrentView = useSetAtom(State.currentView);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: collapsed && !hovered ? "50px" : "200px", transition: "width 0.3s" }}
    >
      <SideBar.Sidebar collapsed={collapsed && !hovered} collapsedWidth="50px">
        <SideBar.Menu>
          <SideBar.MenuItem icon={<HomeIcon />} onClick={() => setCurrentView("overview")}>
            <Text>Overview</Text>
          </SideBar.MenuItem>
          <SideBar.MenuItem icon={<DashboardIcon />} onClick={() => setCurrentView("project")}>

            <Text>Project</Text>
          </SideBar.MenuItem>
          <SideBar.MenuItem icon={<MixIcon />} onClick={() => setCurrentView("evaluate")}>
            <Text>Evaluate</Text>
          </SideBar.MenuItem>
        </SideBar.Menu>
      </SideBar.Sidebar>
    </Box>
  );
};

export default SideMenu;
