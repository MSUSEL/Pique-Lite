import { Box, Flex, Strong, Link } from "@radix-ui/themes";
import React from "react";
import { Version } from "../../state/core";
import { VersionCard } from "../ProjectOverview";

interface VersionListProps {
  versions: Version[];
  onVersionClick: (version: number) => void;
}

export const VersionCards: React.FC<VersionListProps> = ({
  versions,
  onVersionClick,
}) => {
  return (
    <Flex direction="column" gap="3" align="center">
      {versions.map((version, index) => (
        <VersionCard
          key={index}
          version={version}
          title={
            <Box>
              <Strong>Version:</Strong>{" "}
              <Link onClick={() => onVersionClick(index)}>{version.name}</Link>
            </Box>
          } // Only shows version name
          onClick={() => onVersionClick(index)}
        />
      ))}
    </Flex>
  );
};
