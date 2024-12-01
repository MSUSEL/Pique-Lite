import { PageHeader } from "../views/PageHeader";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { InitialProjectSetupDialog } from "./InitialProjectSetupDialog";
import { useState } from "react";
import { FileTextIcon } from "@radix-ui/react-icons";

function Landing() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box>
      <PageHeader showUploader={false} />
      <Flex
        direction="column"
        align="center"
        justify="center"
        // style={{ height: "calc(100vh - 60px)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <img
            src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg"
            alt="CISA Logo"
            width="100"
            height="100"
            style={{ marginRight: "20px" }}
          />
          <Text size="8" weight="bold">
            PIQUE LITE
          </Text>
          <img
            src="https://raw.githubusercontent.com/MSUSEL/msusel-pique-visualizer/refactorZiyi/src/assets/PIQUE_svg.svg"
            alt="PIQUE Logo"
            width="100"
            height="100"
            style={{ marginLeft: "20px" }}
          />
        </div>

        <Button size="4" variant="surface" onClick={() => setDialogOpen(true)}>
          <FileTextIcon width="16" height="16" />
          Get Started
        </Button>

        <InitialProjectSetupDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </Flex>
    </Box>
  );
}

export default Landing;
