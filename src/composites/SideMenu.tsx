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
} from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { Link } from "react-router-dom";

interface SideMenuProps {
  collapsed?: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed = true }) => {
  const [hovered, setHovered] = useState(false);
  const selectedProject = useAtomValue(State.selectedProject);
  const selectedVersion = useAtomValue(State.selectedVersion);

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
          <SideBar.MenuItem icon={<HomeIcon />}>
            <Link to="/overview">
              <Text>Overview</Text>
            </Link>
          </SideBar.MenuItem>

          <SideBar.MenuItem icon={<DashboardIcon />}>
            <Text>Project Details</Text>
            <Link
              to={`/projectview?projectid=${selectedProject}&versionid=${selectedVersion}`}
            >
              <Text>Project</Text>
            </Link>
          </SideBar.MenuItem>
          {/*   <SideBar.MenuItem */}
          {/*     icon={<MixIcon />}> */}
          {/*     <Link to="/compare"> */}
          {/*       <Text>Compare Projects</Text> */}
          {/*     </Link> */}
          {/*   </SideBar.MenuItem> */}
          {/*   <SideBar.MenuItem */}
          {/*     icon={<ListBulletIcon />} */}
          {/*     onClick={() => setCurrentView("versionselector")} */}
          {/*   > */}
          {/*     <Text>Version Selector</Text> */}
          {/*   </SideBar.MenuItem> */}
          {/*   {(currentView === "versionoverview" || */}
          {/*     currentView === "tree" || */}
          {/*     currentView === "list" || */}
          {/*     currentView === "adjustment") && ( */}
          {/*     <> */}
          {/*       <Separator */}
          {/*         style={{ */}
          {/*           width: "80%", */}
          {/*           justifySelf: "center", */}
          {/*           marginTop: "16px", */}
          {/*         }} */}
          {/*       /> */}
          {/*       <Text color="gray" size="1" style={{ opacity: hovered ? 1 : 0 }}> */}
          {/*         Version Level */}
          {/*       </Text> */}
          {/*       <SideBar.MenuItem */}
          {/*         icon={<FileTextIcon />} */}
          {/*         onClick={() => setCurrentView("versionoverview")} */}
          {/*       > */}
          {/*         <Text>Version Details</Text> */}
          {/*       </SideBar.MenuItem> */}
          {/*       <SideBar.MenuItem */}
          {/*         icon={<Share1Icon />} */}
          {/*         onClick={() => setCurrentView("tree")} */}
          {/*       > */}
          {/*         <Text>Tree View</Text> */}
          {/*       </SideBar.MenuItem> */}
          {/*       <SideBar.MenuItem */}
          {/*         icon={<ActivityLogIcon />} */}
          {/*         onClick={() => setCurrentView("list")} */}
          {/*       > */}
          {/*         <Text>List View</Text> */}
          {/*       </SideBar.MenuItem> */}
          {/*       <SideBar.MenuItem */}
          {/*         icon={<MixerHorizontalIcon />} */}
          {/*         onClick={() => setCurrentView("adjustment")} */}
          {/*       > */}
          {/*         <Text>Adjustment</Text> */}
          {/*       </SideBar.MenuItem> */}
          {/*     </> */}
          {/*   )} */}
        </SideBar.Menu>
      </SideBar.Sidebar>
    </Box>
  );
};

export default SideMenu;
