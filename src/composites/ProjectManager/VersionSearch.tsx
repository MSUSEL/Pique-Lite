import { Box } from "@radix-ui/themes";

const VersionSearchBar: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}> = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box style={{ width: "100%" }}>
      <input
        type="text"
        placeholder="Search files..."
        onChange={(e) => setSearchQuery(e.target.value)}
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
