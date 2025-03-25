import { Box, Strong } from "@radix-ui/themes";
import React from "react";
import { VersionHeader } from "../../composites/VersionHeader";

export const ListView: React.FC = () => {
  return (
    <Box>
      <VersionHeader />
      <Strong>Example List View page</Strong>
    </Box>
  );
};

export default ListView;
