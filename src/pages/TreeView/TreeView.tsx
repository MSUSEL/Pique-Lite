import { Box, Strong } from "@radix-ui/themes";
import { VersionHeader } from "../../composites/VersionHeader";
import React from "react";

export const TreeView: React.FC = () => {
  return (
    <Box>
      <VersionHeader />

      <Strong>Example Tree View page</Strong>
    </Box>
  );
};

export default TreeView;
