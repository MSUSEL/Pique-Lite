import { Box, Strong } from "@radix-ui/themes";
import { VersionHeader } from "../../composites/VersionHeader";
import React from "react";

export const VersionOverview: React.FC = () => {
  return (
    <Box>
      <VersionHeader />
      <Strong>Example Version Details page</Strong>
    </Box>
  );
};

export default VersionOverview;
