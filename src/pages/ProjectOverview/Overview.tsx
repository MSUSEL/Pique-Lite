import React, { useState } from "react";
import { useSetAtom } from "jotai";
import { State } from "../../state";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../../composites/FileUploader/hooks/use-projects";
import { ProjectCard } from "./ProjectCard";
import Filters from "../../composites/VersionFiltering/Filters";
import { getRisk } from "../../composites/RiskHelpers";
import { SearchBar } from "../../composites/SearchBar";
import { matchSorter } from "match-sorter";
import { PaginationButtons } from "../../composites/Combobox/PaginationButtons";

const ITEMS_PER_PAGE = 5;

const Overview: React.FC = () => {
  const { projects } = useProjects();
  const setCurrentView = useSetAtom(State.currentView);
  const navigate = useNavigate();

  //Create filtering states with default values
  const [riskFilters, setRiskFilters] = useState<string[]>([
    "Severe",
    "High",
    "Elevated",
    "Guarded",
    "Low",
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const projectsToDisplay = searchFilteredProjects.slice(startIndex, endIndex);

  return (
    <Flex direction="column" align="center">
      <Flex
        direction="row"
        style={{
          width: "90%",
        }}
      >
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
          setCurrentPage={setCurrentPage}
        />
      )}
      {/* Display paginated projects */}
      {projectsToDisplay.map(([uuid, project]) => (
        <ProjectCard
          key={uuid}
          uuid={uuid}
          project={project}
          onProjectClick={(versionIndex) => {
            setCurrentView("project");
            // Only include versionid if it's not the last version
            const isLastVersion = versionIndex === project.versions.length - 1;
            const params = new URLSearchParams({ projectid: uuid });
            if (!isLastVersion) {
              params.set("versionid", versionIndex.toString());
            }
            navigate(`/projectview?${params.toString()}`);
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
  );
};

export default Overview;
