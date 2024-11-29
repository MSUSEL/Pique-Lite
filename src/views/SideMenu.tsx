import { Box, Text } from "@radix-ui/themes";
import * as SideBar from "react-pro-sidebar";
import { useSetAtom } from "jotai";
import { State } from "../state";
import React from "react";

interface SideMenuProps {
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  const setCurrentView = useSetAtom(State.currentView);
  return (
    <Box>
      <SideBar.Sidebar collapsed={collapsed} collapsedWidth="0px">
        <SideBar.Menu>
          <SideBar.MenuItem onClick={() => setCurrentView("overview")}>
            <Text>Overview</Text>
          </SideBar.MenuItem>
          <SideBar.MenuItem onClick={() => setCurrentView("project")}>
            <Text>Project</Text>
          </SideBar.MenuItem>
          <SideBar.MenuItem onClick={() => setCurrentView("evaluate")}>
            <Text>Evaluate</Text>
          </SideBar.MenuItem>
        </SideBar.Menu>
      </SideBar.Sidebar>
    </Box>
  );
};

export default SideMenu;
