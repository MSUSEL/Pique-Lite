import { getAllRiskLevels } from "../risk-helpers";
import { RiskLegend } from "./RiskCards";

function RiskLevelLegend()  {
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

export default RiskLevelLegend;