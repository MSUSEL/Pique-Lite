import React, { useState } from "react";
import { useSetAtom } from "jotai";
import { State } from "../../state";
import { Box, Flex } from "@radix-ui/themes";
import { useProjects } from "../../composites/FileUploader/useProjects";
import { ProjectCard } from "./ProjectCard";
import Filters from "./Filters";
import { getRisk } from "../../risk-helpers";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Overview: React.FC = () => {
  const { projects, selectedProjectId } = useProjects();
  const setCurrentView = useSetAtom(State.currentView);
  const setProject = useSetAtom(State.selectedProject);
  const setVersion = useSetAtom(State.selectedVersion);

  const initialFilters = ["Severe", "High", "Elevated", "Guarded", "Low"];
  const [filters, setFilters] = useState<string[]>(initialFilters);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilterChange = (newFilters: string[]) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  if (!projects || !selectedProjectId) return null;

  return (
    <Box
      className="Overview-root"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Flex direction="column" style={{ justifyContent: "center" }}>
        <Flex direction="row">
          <input
            type="text"
            placeholder="Search projects..."
            onChange={handleSearchChange}
            value={searchQuery}
            style={{
              margin: "10px",
              background: "white",
              width: "80%",
              border: "none",
              borderBottom: "2px solid gray",
              color: "black",
            }}
          />
          <Filters onFilterChange={handleFilterChange} />
        </Flex>
        {Object.entries(projects).map(([uuid, project]) => {
          if (project.versions.length === 0) return null;

          const recentRisk = getRisk(
            project.versions[project.versions.length - 1].data.value,
            "normal"
          );

          const matchesRiskFilter = filters.includes(recentRisk.name);
          const matchesSearch =
            searchQuery === "" ||
            project.name.toLowerCase().includes(searchQuery);
          if (!matchesRiskFilter || !matchesSearch) return null;

          return (
            <ProjectCard
              key={uuid}
              uuid={uuid}
              project={project}
              onProjectClick={(versionIndex) => {
                setCurrentView("project");
                setProject(uuid);
                setVersion(versionIndex);
              }}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default Overview;
