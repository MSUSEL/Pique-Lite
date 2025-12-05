import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { getRisk, useRiskColor, getAllRiskLevels } from "../../composites/RiskHelpers";
import { useColorMode } from "@/composites/ColorMode";
import { useRiskLevelSettings } from "../../composites/RiskLevelSettings";

export interface RiskCardProps {
  title: string;
  score: number | string;
  icon?: React.ReactNode;
  scale: "diagnostic" | "normal";
  riskLevelName?: 'severe' | 'high' | 'elevated' | 'guarded' | 'low';
}

export const RiskCard = (props: RiskCardProps) => {
  const { getRiskColor } = useRiskColor();
  const risk = getRisk(props.score, props.scale);
  return (
    <Badge
      variant="outline"
      className="flex flex-col items-center"
      style={{
        backgroundColor: getRiskColor(props.score, "background", props.scale),
        borderColor: getRiskColor(props.score, "badge", props.scale),
        color: getRiskColor(props.score, "font", props.scale)
      }}
    >
      <div className="p-3 text-2xl">{risk.icon}</div>
      <p className="text-sm">{props.title}</p>
      {/* <Heading>{props.score}</Heading> */}
    </Badge>
  );
};

export const RiskLegendCard = (props: RiskCardProps) => {
  const { getRiskColor: getColorByName } = useColorMode();
  const { riskLevelRanges } = useRiskLevelSettings();

  // Use riskLevelName if provided, otherwise fall back to score lookup
  let risk;
  let riskLevelKey: 'severe' | 'high' | 'elevated' | 'guarded' | 'low';

  if (props.riskLevelName) {
    // Direct name lookup
    riskLevelKey = props.riskLevelName;
    const allLevels = getAllRiskLevels(riskLevelRanges);
    risk = allLevels.find(level => level.name.toLowerCase() === props.riskLevelName);
    if (!risk) {
      risk = getRisk(props.score, props.scale, riskLevelRanges);
    }
  } else {
    // Score-based lookup
    risk = getRisk(props.score, props.scale, riskLevelRanges);
    riskLevelKey = risk.name.toLowerCase() as 'severe' | 'high' | 'elevated' | 'guarded' | 'low';
  }

  return (
    <Badge
      variant="outline"
      className="flex flex-row items-center pl-2"
      style={{
        backgroundColor: getColorByName(riskLevelKey, "background")
      }}
    >
      <p className="mr-1">{props.title}</p>
      <div className="p-1 text-base">{risk.icon}</div>
    </Badge>
  );
};

interface RiskCardsProps {
  risks: { title: string; score: number | string; riskLevelName?: 'severe' | 'high' | 'elevated' | 'guarded' | 'low' }[];
  scale?: "diagnostic" | "normal";
}
const defaultRiskCardsProps: Pick<RiskCardsProps, "scale"> = {
  scale: "diagnostic"
};

export const RiskCards = (props: RiskCardsProps) => {
  props = { ...defaultRiskCardsProps, ...props };
  return (
    <div className="flex gap-2">
      {props.risks.map((risk) => (
        <div key={risk.title}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-block">
                  <RiskCard
                    title={risk.title}
                    score={risk.score}
                    scale={props.scale || "diagnostic"}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Risk Score:{" "}
                  {typeof risk.score === "number"
                    ? risk.score.toFixed(2)
                    : risk.score}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ))}
    </div>
  );
};

export const RiskLegend = (props: RiskCardsProps) => {
  props = { ...defaultRiskCardsProps, ...props };
  const { getRiskColor } = useColorMode();
  const { riskLevelRanges } = useRiskLevelSettings();

  return (
    <div className="flex flex-grow flex-wrap gap-2">
      {props.risks.map((risk) => {
        // If riskLevelName is provided, use it directly; otherwise fall back to score lookup
        let riskLevel;
        if (risk.riskLevelName) {
          // For legend items with explicit risk level names, use getAllRiskLevels with custom ranges
          const allLevels = getAllRiskLevels(riskLevelRanges);
          riskLevel = allLevels.find(level => level.name.toLowerCase() === risk.riskLevelName);
          if (!riskLevel) {
            riskLevel = getRisk(risk.score, props.scale || "diagnostic", riskLevelRanges);
          }
        } else {
          riskLevel = getRisk(risk.score, props.scale || "diagnostic", riskLevelRanges);
        }

        const range = props.scale === "normal" ? riskLevel.normalRange : riskLevel.diagnosticRange;
        const rangeText = `${range[0] === -Infinity ? "0" : range[0].toFixed(2)} - ${range[1] === Infinity ? "∞" : range[1].toFixed(2)}`;

        return (
          <div key={risk.title}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="inline-block">
                    <RiskLegendCard
                      title={risk.title}
                      score={risk.score}
                      scale={props.scale || "diagnostic"}
                      riskLevelName={risk.riskLevelName}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Risk Score Range: {rangeText}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      })}
    </div>
  );
};
