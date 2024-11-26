import React from "react";
import { Box, Text } from "@radix-ui/themes";
import * as SideBar from "react-pro-sidebar";
import { useSetAtom } from "jotai";
import { State } from "../state";
import { HomeIcon, FolderIcon, ChartBarIcon } from "@radix-ui/react-icons";

const SideMenu: React.FC = () => {
  const setCurrentView = useSetAtom(State.currentView);

  const menuItems = [
    { label: "Overview", icon: <HomeIcon />, view: "overview" },
    { label: "Project", icon: <FolderIcon />, view: "project" },
    { label: "Evaluate", icon: <ChartBarIcon />, view: "evaluate" },
  ];

  return (
    <Box
      css={{
        display: "flex",
        flexDirection: "column",
        width: "200px", // Fixed width for sidebar
      }}
    >
      <SideBar.Sidebar>
        <SideBar.Menu>
          {menuItems.map((item) => (
            <SideBar.MenuItem
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 15px",
                gap: "10px",
              }}
            >
              {item.icon}
              <Text>{item.label}</Text>
            </SideBar.MenuItem>
          ))}
        </SideBar.Menu>
      </SideBar.Sidebar>
    </Box>
  );
};

export default SideMenu;
