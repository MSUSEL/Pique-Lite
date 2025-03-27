import React from "react";
import { Link } from "react-router-dom";
import scarecrow404 from "../../assets/Scarecrow.png";
import { Flex, Box, Text, Button } from "@radix-ui/themes";

const NotFound: React.FC = () => {
    return (
        <Flex
            direction="column"
            align="center"
            width="100%"
            height="100vh"
        >
        <Box>
            <img
            src={scarecrow404}
            alt="404-Scarecrow"
            style={{ maxWidth: "50%", height: "auto"}}
            />
        </Box>
        <Text size="6" weight="bold" style={{ marginTop: "20px" }}>
            I have bad news for you
        </Text>
        <Text size="4" color="gray" style={{ marginTop: "20px" }}>
            The page you are looking for doesn't exist or might be removed.
        </Text>
        <Link to="/overview" style={{ marginTop: "20px" }}>
            <Button size="2" variant="surface">
                Back to Homepage
            </Button>
        </Link>
        </Flex>
  );
};

export default NotFound;