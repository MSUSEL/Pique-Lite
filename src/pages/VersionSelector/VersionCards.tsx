import { Flex, Strong, Text } from "@radix-ui/themes";
import React from "react";
import { Version } from "../../state/core";
import { Card } from "@radix-ui/themes";

interface VersionListProps {
  versions: Version[];
  onVersionClick: (version: number) => void;
}

export const VersionCards: React.FC<VersionListProps> = ({
  versions,
  onVersionClick,
}) => {
  return (
    <Flex direction="column" gap="3" align={"center"}>
      {versions.map((version, index) => (
        <Card
          style={{ margin: "10px", minWidth: "550px", maxWidth: "1024px" }}
          onClick={() => onVersionClick(index)}
        >
          <Flex direction="column" gap="2">
            <Text size="4" weight="bold">
              {version.name}
            </Text>
            <Text size="3" color="gray">
              Last Modified: {new Date(version.date).toLocaleDateString()}
            </Text>
            <Text size="3">
              <Strong>TQI Value:</Strong> {version.data.value.toPrecision(2)}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default VersionCards;
