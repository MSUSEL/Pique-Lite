import { Box, Text } from "@radix-ui/themes";
import * as SideBar from "react-pro-sidebar";
import { useAtom } from "jotai";
import { State } from "../state";
import React, { useState } from "react";
import { HomeIcon, DashboardIcon, MixIcon } from "@radix-ui/react-icons"; // Replace with actual icons
import { Link } from "react-router-dom";

interface SideMenuProps {
  collapsed?: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed = true }) => {
  const [hovered, setHovered] = useState(false);
  const [selectedProject] = useAtom(State.selectedProject); 
  const [selectedVersion] = useAtom(State.selectedVersion);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <Box
      className="SideMenu-root"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      height="100%"
      // style={{ width: collapsed && !hovered ? "50px" : "200px", transition: "width 0.3s" }}
    >
      <SideBar.Sidebar
        collapsed={collapsed && !hovered}
        style={{ height: "100%" }}
      >
        <SideBar.Menu>
          <SideBar.MenuItem 
            icon={<HomeIcon />}>
            <Link to="overview">
              <Text>Overview</Text>
            </Link>
          </SideBar.MenuItem>

          <SideBar.MenuItem 
            icon={<DashboardIcon />}>
            <Link to={`/projectview/projectid=${selectedProject}/versionid=${selectedVersion}`}>
              <Text>Project</Text>
            </Link>
          </SideBar.MenuItem>

          <SideBar.MenuItem 
            icon={<MixIcon />}>
            <Link to="/compare">
              <Text>Compare Projects</Text>
            </Link>
          </SideBar.MenuItem>
        </SideBar.Menu>
      </SideBar.Sidebar>
    </Box>
  );
};

export default SideMenu;
