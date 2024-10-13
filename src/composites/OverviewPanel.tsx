import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <Card style={{ margin: "10px"}}>
      <Flex direction="column" gap="4">
        {children}
      </Flex>
    </Card>
  );
};

export const Title = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <Text color="gray" size="6" weight="bold">
        {children}
      </Text>
    </Box>
  );
};

export const Content = ({ children }: PropsWithChildren) => {
  return <Box>{children}</Box>;
};
