import { Flex } from "@radix-ui/themes";
import { VersionCards } from "./VersionCards";
import React, { useMemo, useState } from "react";
import { State } from "../../state";
import { LabelledComboBox } from "../../composites/Combobox";
import { useAtom, useSetAtom, useAtomValue } from "jotai";
import SearchBar from "../../composites/SearchBar";
import { matchSorter } from "match-sorter";
import Filters from "../../composites/VersionFiltering/Filters";
import { getRisk } from "../../composites/RiskHelpers";
import { PaginationButtons } from "../../composites/Combobox/PaginationButtons";

const ITEMS_PER_PAGE = 5;

export const VersionSelector: React.FC = () => {
  const projectMapping = useAtomValue(State.projects);

  const setCurrentView = useSetAtom(State.currentView);
  const setVersion = useSetAtom(State.selectedVersion);
  const setSelectedProjectId = useSetAtom(State.selectedProject);

  const projects = Object.values(projectMapping || {});

  const [riskFilters, setRiskFilters] = useState<string[]>([
    "Severe",
    "High",
    "Elevated",
    "Guarded",
    "Low",
  ]);
  const [selectedProjectId] = useAtom(State.selectedProject);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 1.0]);

  const handleFilterChange = (newFilters: string[], newValues: number[]) => {
    setRiskFilters(newFilters);
    setSliderValue(newValues);
  };

  const selectedProject =
    projects.find((project) => project.uuid === selectedProjectId) || null;

  const versions = useMemo(() => {
    if (!selectedProject) return [];
    return selectedProject.versions;
  }, [selectedProject]);

  const filteredVersions = Object.entries(versions).filter(([, version]) => {
    //If no versions
    if (!version) return false;

    //Set recent version to last one uploaded
    const recentRisk = getRisk(version.data.value, "normal");

    //Check recent version if it matches risk level filters
    const matchesRiskFilter = riskFilters.includes(recentRisk.name);
    //Check recent version with slider value
    const matchesSliderFilter =
      version.data.value >= sliderValue[0] &&
      version.data.value <= sliderValue[1];

    return matchesRiskFilter && matchesSliderFilter;
  });

  //Process search query
  const sortedVersions = matchSorter(filteredVersions, searchQuery, {
    keys: ["*.name"],
  });

  //Pagination logic
  const totalPages = Math.ceil(sortedVersions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const versionsToDisplay = sortedVersions.slice(startIndex, endIndex);

  return (
    <Flex
      direction="column"
      align="center"
      style={{
        margin: "10px",
      }}
    >
      <Flex direction="row" gap="4" style={{ width: "90%" }}>
        <LabelledComboBox
          label="Project"
          getOptionKey={(project) => project.uuid}
          getOptionLabel={(project) => project.name}
          options={projects}
          value={selectedProject}
          onChange={(project) => setSelectedProjectId(project?.uuid || "")}
        />
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hint={"projects"}
        />
        <Filters
          selectedFilters={riskFilters}
          sliderValue={sliderValue}
          onFilterChange={handleFilterChange}
          versions={versions}
        />
      </Flex>
      <VersionCards
        versions={versionsToDisplay.map(([, version]) => version)}
        onVersionClick={(versionIndex) => {
          setCurrentView("versionoverview");
          setVersion(versionIndex);
        }}
      />
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

export default VersionSelector;
