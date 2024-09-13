import { Heading } from "@radix-ui/themes";

export function PageHeader() {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        backgroundColor: "#f9f9f9",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: "10px",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
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
    </div>
  );
}
