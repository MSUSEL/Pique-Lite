import { Box } from "@radix-ui/themes";

const SearchBar: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  hint: string;
}> = ({ searchQuery, setSearchQuery, hint }) => {
  return (
    <Box style={{ width: "100%" }}>
      <input
        type="text"
        placeholder={"Search " + hint + "..."}
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

export default SearchBar;
