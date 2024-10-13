import { Box, IconButton, Text } from "@radix-ui/themes";
import { PinLeftIcon, PinRightIcon } from "@radix-ui/react-icons";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { selectedContentAtom } from "../pages/MainView"; // Adjust the import path as needed

function SideBar() {
  const [collapsed, setCollapsed] = useState(true);
  const setSelectedContent = useSetAtom(selectedContentAtom);

  return (
    <Box> 
      <IconButton
        size="3"
        variant="soft"
        style={{
          position: "absolute",
          top: "10vh",
          left: collapsed ? "10px" : "260px",
          zIndex: 2,
          transition: "left 0.3s ease-in-out",
        }}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <PinLeftIcon /> : <PinRightIcon />}
      </IconButton>
      <Sidebar collapsed={collapsed} collapsedWidth="0px">
        <Menu>
          <MenuItem onClick={() => setSelectedContent("overview")}>
            <Text>Overview</Text>
          </MenuItem>
          <MenuItem onClick={() => setSelectedContent("compare")}>
            <Text>Compare</Text>
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default SideBar;