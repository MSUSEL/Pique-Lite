import { Box, Strong } from "@radix-ui/themes";
import React from "react";
import { VersionHeader } from "../../composites/VersionHeader";

export const ImportanceAdjustment: React.FC = () => {
  return (
    <Box>
      <VersionHeader />
      <Strong>Example Adjustment page</Strong>
    </Box>
  );
};

export default ImportanceAdjustment;
