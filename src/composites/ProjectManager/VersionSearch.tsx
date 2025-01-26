import { useState } from "react";
import { Version } from "../../state";
import { matchSorter } from "match-sorter";
import { Box } from "@radix-ui/themes";

const VersionSearchBar: React.FC<{
  versions: Version[];
  setFilteredVersions: (versions: Version[]) => void;
}> = ({ versions, setFilteredVersions }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredVersions = matchSorter(versions, query, {
      keys: ["*.name"],
    });
    setFilteredVersions(filteredVersions);
  };
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Box>
      <input
        type="text"
        placeholder="Search files..."
        onChange={handleSearchChange}
        value={searchQuery}
        style={{
          margin: "10px",
          marginLeft: "0px",
          background: "white",
          width: "90%",
          border: "none",
          borderBottom: "2px solid gray",
          color: "black",
        }}
      />
    </Box>
  );
};

export default VersionSearchBar;
