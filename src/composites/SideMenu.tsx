import { Box, Separator, Text } from "@radix-ui/themes";
import * as SideBar from "react-pro-sidebar";
import { useAtom } from "jotai";
import { State } from "../state";
import React, { useState } from "react";
import {
  HomeIcon,
  DashboardIcon,
  MixIcon,
  ActivityLogIcon,
  Share1Icon,
  FileTextIcon,
  ListBulletIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons"; // Replace with actual icons

interface SideMenuProps {
  collapsed?: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed = true }) => {
  const [currentView, setCurrentView] = useAtom(State.currentView);
  const [hovered, setHovered] = useState(false);

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
        <Text color="gray" size="1" style={{ opacity: hovered ? 1 : 0 }}>
          Project Level
        </Text>
        <SideBar.Menu>
          <SideBar.MenuItem
            icon={<HomeIcon />}
            onClick={() => setCurrentView("overview")}
          >
            <Text>Overview</Text>
          </SideBar.MenuItem>
          <SideBar.MenuItem
            icon={<DashboardIcon />}
            onClick={() => setCurrentView("project")}
          >
            <Text>Project Details</Text>
          </SideBar.MenuItem>
          <SideBar.MenuItem
            icon={<MixIcon />}
            onClick={() => setCurrentView("compare")}
          >
            <Text>Compare Projects</Text>
          </SideBar.MenuItem>
          <SideBar.MenuItem
            icon={<ListBulletIcon />}
            onClick={() => setCurrentView("versionselector")}
          >
            <Text>Version Selector</Text>
          </SideBar.MenuItem>
          {(currentView === "versionoverview" ||
            currentView === "tree" ||
            currentView === "list" ||
            currentView === "adjustment") && (
            <>
              <Separator
                style={{
                  width: "80%",
                  justifySelf: "center",
                  marginTop: "16px",
                }}
              />
              <Text color="gray" size="1" style={{ opacity: hovered ? 1 : 0 }}>
                Version Level
              </Text>
              <SideBar.MenuItem
                icon={<FileTextIcon />}
                onClick={() => setCurrentView("versionoverview")}
              >
                <Text>Version Details</Text>
              </SideBar.MenuItem>
              <SideBar.MenuItem
                icon={<Share1Icon />}
                onClick={() => setCurrentView("tree")}
              >
                <Text>Tree View</Text>
              </SideBar.MenuItem>
              <SideBar.MenuItem
                icon={<ActivityLogIcon />}
                onClick={() => setCurrentView("list")}
              >
                <Text>List View</Text>
              </SideBar.MenuItem>
              <SideBar.MenuItem
                icon={<MixerHorizontalIcon />}
                onClick={() => setCurrentView("adjustment")}
              >
                <Text>Adjustment</Text>
              </SideBar.MenuItem>
            </>
          )}
        </SideBar.Menu>
      </SideBar.Sidebar>
    </Box>
  );
};

export default SideMenu;
