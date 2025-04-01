import { Box, Text } from "@radix-ui/themes";
import * as SideBar from "react-pro-sidebar";
import React, { useState } from "react";
import {
  HomeIcon,
  DashboardIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

interface SideMenuProps {
  collapsed?: boolean;
  selectedProjectId?: string | null;
  selectedVersionId?: string | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ 
  collapsed = true,
  selectedProjectId = null,
  selectedVersionId = null
}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <Box
      className="SideMenu-root"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      height="100%"
    >
      <SideBar.Sidebar
        collapsed={collapsed && !hovered}
        style={{ height: "100%" }}
      >
        <Text color="gray" size="1" style={{ opacity: hovered ? 1 : 0 }}>
          Project Level
        </Text>
        <SideBar.Menu>
          <SideBar.MenuItem
            component={<Link to="/overview" />}
            icon={<HomeIcon />}
          >
            <Text>Overview</Text>
          </SideBar.MenuItem>

          <SideBar.MenuItem
            icon={<DashboardIcon />}
            component={
              <Link
                to={`/projectview?projectid=${selectedProjectId}&versionid=${selectedVersionId}`}
              />
            }
          >
            <Text>Project Details</Text>
          </SideBar.MenuItem>
        </SideBar.Menu>
      </SideBar.Sidebar>
    </Box>
  );
};

export default SideMenu;
