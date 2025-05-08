import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { getRisk } from "../../composites/RiskHelpers";

export interface RiskCardProps {
  title: string;
  score: number | string;
  icon?: React.ReactNode;
  scale: "diagnostic" | "normal";
}

export const RiskCard = (props: RiskCardProps) => {
  const risk = getRisk(props.score, props.scale);
  return (
    <Badge
      variant="outline"
      className="flex flex-col items-center"
      style={{
        backgroundColor: risk.color,
        borderColor: risk.badgeColor,
        color: risk.badgeColor
      }}
    >
      <div className="p-3 text-2xl">{risk.icon}</div>
      <p className="text-sm">{props.title}</p>
      {/* <Heading>{props.score}</Heading> */}
    </Badge>
  );
};

export const RiskLegendCard = (props: RiskCardProps) => {
  const risk = getRisk(props.score, props.scale);
  return (
    <Badge
      variant="outline"
      className="flex flex-row items-center pl-2"
      style={{
        backgroundColor: risk.color
      }}
    >
      <p className="mr-1">{props.title}</p>
      <div className="p-1 text-base">{risk.icon}</div>
    </Badge>
  );
};

interface RiskCardsProps {
  risks: { title: string; score: number | string }[];
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
  return (
    <div className="flex flex-grow flex-wrap gap-2">
      {props.risks.map((risk) => (
        <div key={risk.title}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="inline-block">
                  <RiskLegendCard
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
