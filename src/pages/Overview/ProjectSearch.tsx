import { useState } from "react";
import { Project } from "../../state";
import { matchSorter } from "match-sorter";
import { Box } from "@radix-ui/themes";

const ProjectSearchBar: React.FC<{
  projects: [string, Project][];
  setSortedProjects: (projects: [string, Project][]) => void;
}> = ({ projects, setSortedProjects }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const sortedProjects = matchSorter(Object.values(projects), query, {
      keys: ["*.name"],
    });
    setSortedProjects(sortedProjects);
  };
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Box>
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
    </Box>
  );
};

export default ProjectSearchBar;
