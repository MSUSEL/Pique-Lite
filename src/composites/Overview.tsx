import { LinePlot } from "./PiqueChart";
import { RiskLegend } from "./RiskCards";
import { getAllRiskLevels } from "../risk-helpers";
import * as OverviewPanel from "./OverviewPanel";

export const RiskLevelLegend = () => {
  const allRisks = getAllRiskLevels();

  return (
    <RiskLegend
      risks={allRisks.map((risk) => ({
        title: risk.name,
        score: risk.diagnosticRange[1] - 0.001,
      }))}
      scale="diagnostic"
    />
  );
};

function Overview() {

  return (
    <OverviewPanel.Container>
      <OverviewPanel.Title>Characteristics</OverviewPanel.Title>
      <LinePlot />
    </OverviewPanel.Container>
  );
}

export default Overview;
