import React, { useState } from "react";
import { useSetAtom } from "jotai";
import { State } from "../../state";
import { Box, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { useProjects } from "../../composites/FileUploader/useProjects";
import { ProjectCard } from "./ProjectCard";
import Filters from "./Filters";
import { getRisk } from "../../risk-helpers";

const ITEMS_PER_PAGE = 5;

const Overview: React.FC = () => {
  const { projects, selectedProjectId } = useProjects();
  const setCurrentView = useSetAtom(State.currentView);
  const setProject = useSetAtom(State.selectedProject);
  const setVersion = useSetAtom(State.selectedVersion);

  if (!projects || !selectedProjectId) return null;

  const initialFilters = ["Severe", "High", "Elevated", "Guarded", "Low"];
  const [filters, setRiskFilters] = useState<string[]>(initialFilters);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sliderValue, setSliderValue] = useState([0, 1.0]);

  const handleFilterChange = (newFilters: string[], newValues: number[]) => {
    setRiskFilters(newFilters);
    setSliderValue(newValues);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = Object.entries(projects).filter(([, project]) => {
    if (project.versions.length === 0) return false;

    const recentVersion = project.versions[project.versions.length - 1];

    const recentRisk = getRisk(recentVersion.data.value, "normal");

    const matchesRiskFilter = filters.includes(recentRisk.name);
    const queryLowercase = searchQuery.toLowerCase();
    const matchesSearch =
      queryLowercase === "" ||
      project.name.toLowerCase().includes(queryLowercase);
    const matchesSliderFilter =
      recentVersion.data.value >= sliderValue[0] &&
      recentVersion.data.value <= sliderValue[1];

    return matchesRiskFilter && matchesSearch && matchesSliderFilter;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const projectsToDisplay = filteredProjects.slice(startIndex, endIndex);

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
              width: "60vw",
              border: "none",
              borderBottom: "2px solid gray",
              color: "black",
            }}
          />
          <Filters onFilterChange={handleFilterChange} projects={projects} />
        </Flex>
        {projectsToDisplay.length === 0 && (
          <Flex direction={"column"} align="center">
            <Heading mt="6" color="gray" size="5">
              No projects found
            </Heading>
            <Text mt="2" color="gray" size="3">
              Try changing your filters or adding more projects
            </Text>
          </Flex>
        )}
        {totalPages > 1 && (
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
        {projectsToDisplay.map(([uuid, project]) => (
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
        ))}
        {totalPages > 1 && (
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Flex>
    </Box>
  );
};

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Flex direction="row" gap="3" mt="4">
      <Link
        onClick={handlePreviousPage}
        style={{
          color: currentPage === 1 ? "gray" : "blue",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        Previous
      </Link>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          style={{
            color: currentPage === index + 1 ? "black" : "blue",
            cursor: "pointer",
          }}
        >
          {index + 1}
        </Link>
      ))}
      <Link
        onClick={handleNextPage}
        style={{
          color: currentPage === totalPages ? "gray" : "blue",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next
      </Link>
    </Flex>
  );
};
export default Overview;
