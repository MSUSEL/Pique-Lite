import React, { useState } from "react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useProjects } from "../../composites/FileUploader/hooks/use-projects";
import { getRisk } from "../../composites/RiskHelpers";
import SearchBar from "../../composites/SearchBar";
import { matchSorter } from "match-sorter";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { ProjectCard } from "../ProjectOverview";
import Filters from "../../composites/VersionFiltering/Filters";

const ITEMS_PER_PAGE = 5;

const ProjectList: React.FC = () => {
  const { projects } = useProjects();
  console.log(projects);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  let currentPage = page ? parseInt(page, 10) : 1;

  //Create filtering states with default values
  const [riskFilters, setRiskFilters] = useState<string[]>([
    "Severe",
    "High",
    "Elevated",
    "Guarded",
    "Low",
  ]);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 1.0]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!projects) return null;

  const handleFilterChange = (newFilters: string[], newValues: number[]) => {
    setRiskFilters(newFilters);
    setSliderValue(newValues);
  };

  //Pass projects state through filters to create a set of projects to display
  const filteredProjects = Object.entries(projects).filter(([, project]) => {
    //If no projects
    if (project.versions.length === 0) return false;

    //Set recent version to last one uploaded
    //TODO: change this to set recent version based on date, if possible
    const recentVersion = project.versions[project.versions.length - 1];
    const recentRisk = getRisk(recentVersion.data.value, "normal");

    //Check recent version if it matches risk level filters
    const matchesRiskFilter = riskFilters.includes(recentRisk.name);
    //Check recent version with slider value
    const matchesSliderFilter =
      recentVersion.data.value >= sliderValue[0] &&
      recentVersion.data.value <= sliderValue[1];

    return matchesRiskFilter && matchesSliderFilter;
  });

  //Process search query
  const searchFilteredProjects = matchSorter(filteredProjects, searchQuery, {
    keys: ["*.name"],
  });

  //Pagination logic
  const totalPages = Math.ceil(searchFilteredProjects.length / ITEMS_PER_PAGE);
  currentPage = currentPage > totalPages ? 1 : currentPage;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const projectsToDisplay = searchFilteredProjects.slice(startIndex, endIndex);

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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            hint={"projects"}
          />
          {/* Contains all checkbox and slider filters in 'Filters' popover */}
          <Filters
            selectedFilters={riskFilters}
            sliderValue={sliderValue}
            onFilterChange={handleFilterChange}
            projects={projects}
          />
        </Flex>
        {/* Display if filters have filtered out all projects */}
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
          />
        )}
        {/* Display paginated projects */}
        {projectsToDisplay.map(([uuid, project]) => (
          <ProjectCard
            key={uuid}
            uuid={uuid}
            project={project}
            onProjectClick={(versionIndex) => {
              // Only include versionid if it's not the last version
              const isLastVersion =
                versionIndex === project.versions.length - 1;
              const searchParams = new URLSearchParams({ projectid: uuid });
              // if (!isLastVersion) {
              //   searchParams.set("versionid", versionIndex.toString());
              // }
              navigate(`/project/${uuid}`);
            }}
          />
        ))}
        {totalPages > 1 && (
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </Flex>
    </Box>
  );
};

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
}

//Pagination logic
//TODO: Add this to another file, it is used in other places in PIQUE LITE
export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
}) => {
  return (
    <Flex direction="row" gap="3" mt="4">
      <Link
        to={`?page=${currentPage - 1}`}
        onClick={(e) => {
          if (currentPage === 1) e.preventDefault();
        }}
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
          to={`?page=${index + 1}`}
          style={{
            color: currentPage === index + 1 ? "black" : "blue",
            cursor: "pointer",
          }}
        >
          {index + 1}
        </Link>
      ))}
      <Link
        to={`?page=${currentPage + 1}`}
        style={{
          color: currentPage === totalPages ? "gray" : "blue",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
        onClick={(e) => {
          if (currentPage === totalPages) e.preventDefault();
        }}
      >
        Next
      </Link>
    </Flex>
  );
};

export default ProjectList;
