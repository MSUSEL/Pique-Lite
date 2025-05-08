import React, { useState } from "react";
import { useProjects } from "../composites/FileUploader/hooks/use-projects";
import { getRisk } from "../composites/RiskHelpers";
import { SearchBar } from "../composites/SearchBar";
import { matchSorter } from "match-sorter";
import { useSearchParams, useNavigate } from "react-router-dom";
import Filters from "../composites/VersionFiltering/Filters";
import { ProjectCard } from "../pages/ProjectOverview/ProjectCard";
import { PaginationButtons } from "../composites/Pagination/PaginationButtons";
import { RiskLevelLegend } from "../pages/ProjectDetailsView";

const ITEMS_PER_PAGE = 5;

export default function Component() {
  const { projects } = useProjects();
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
    "Low"
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
    keys: ["*.name"]
  });

  //Pagination logic
  const totalPages = Math.ceil(searchFilteredProjects.length / ITEMS_PER_PAGE);
  currentPage = currentPage > totalPages ? 1 : currentPage;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const projectsToDisplay = searchFilteredProjects.slice(startIndex, endIndex);

  return (
    <div className="Overview-root px-4">
      <div className="flex justify-center gap-2 p-2">
        <Filters
          selectedFilters={riskFilters}
          sliderValue={sliderValue}
          onFilterChange={handleFilterChange}
          projects={projects}
        />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hint={"projects"}
        />
        {/* Contains all checkbox and slider filters in 'Filters' popover */}
      </div>

      <div className="flex max-w-[max-content] items-center justify-start gap-2 px-4 py-2">
        <h1 className="text-md text-gray-500">Risk Levels</h1>
        <RiskLevelLegend />
      </div>
      {/* Display if filters have filtered out all projects */}
      {projectsToDisplay.length === 0 && (
        <div className="flex h-full flex-col items-center justify-center">
          <h1 className="text-2xl text-gray-700">No projects found</h1>
          <span className="text-gray-500">
            Try changing your filters or adding more projects
          </span>
        </div>
      )}
      {/* Display paginated projects */}
      {projectsToDisplay.length > 0 && (
        <div className="mt-4 flex flex-col gap-4 pl-10">
          {projectsToDisplay.map(([uuid, project]) => (
            <ProjectCard
              key={uuid}
              uuid={uuid}
              project={project}
              onProjectClick={() => {
                navigate(`/project/${uuid}`);
              }}
            />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <PaginationButtons currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
