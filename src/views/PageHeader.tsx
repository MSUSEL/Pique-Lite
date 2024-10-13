import { Heading, Flex, Box } from "@radix-ui/themes";
import { RiskLevelLegend } from "../composites/Overview";

export function PageHeader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        width: "100%",
        alignItems: "center",
        padding: "20px 0",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      {/* Header with logos and title */}
      <Flex justify="center" align="center" gap="3">
        <img
          src="https://www.cisa.gov/profiles/cisad8_gov/themes/custom/gesso/dist/images/backgrounds/6fdaa25709d28dfb5cca.svg"
          alt="CISA Logo"
          width="100"
          height="100"
          style={{ marginRight: "20px" }}
        />
        <Heading>PIQUE Lite</Heading>
        <img
          src="https://raw.githubusercontent.com/MSUSEL/msusel-pique-visualizer/refactorZiyi/src/assets/PIQUE_svg.svg"
          alt="PIQUE Logo"
          width="100"
          height="100"
          style={{ marginLeft: "20px" }}
        />
      </Flex>
      <Box marginTop="10px">
        <RiskLevelLegend />
      </Box>
    </div>
  );
}
