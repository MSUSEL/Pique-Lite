import { Box, Flex, Badge, Text, Tooltip } from "@radix-ui/themes";
import { getRisk } from "../risk-helpers";

export interface RiskCardProps {
  title: string;
  score: number | string;
  icon?: React.ReactNode;
  scale: "diagnostic" | "normal";
}

export const RiskCard = (props: RiskCardProps) => {
  const risk = getRisk(props.score, props.scale);
  return (
    <Badge style={{ backgroundColor: risk.color, color: risk.badgeColor }} size="1">
      <Flex direction="column">
        <Box p="3" style={{ fontSize: 25 }}>
          {risk.icon}
        </Box>
        <Text color={risk.fontColor}>{props.title}</Text>
      </Flex>
      {/* <Heading>{props.score}</Heading> */}
    </Badge>
  );
};

export const RiskLegendCard = (props: RiskCardProps) => {
  const risk = getRisk(props.score, props.scale);
  return (
    <Badge style={{ backgroundColor: risk.color, color: risk.badgeColor }} size="1">
      <Flex direction="row" align="center" pl="2">
        <Text color={risk.fontColor}>{props.title}</Text>
        <Box p="1" style={{ fontSize: 16 }}>
          {risk.icon}
        </Box>
      </Flex>
    </Badge>
  );
};

interface RiskCardsProps {
  risks: { title: string; score: number | string }[];
  scale?: "diagnostic" | "normal";
}
const defaultRiskCardsProps: Pick<RiskCardsProps, "scale"> = {
  scale: "diagnostic",
};

export const RiskCards = (props: RiskCardsProps) => {
  props = { ...defaultRiskCardsProps, ...props };
  return (
    <Flex gap="2">
      {props.risks.map((risk) => (
        <Box key={risk.title}>
          <Tooltip content={`Risk Score: ${risk.score.toFixed(2)}`}>
            <Box display="inline-block">
              <RiskCard
                title={risk.title}
                score={risk.score}
                scale={props.scale || "diagnostic"}
              />
            </Box>
          </Tooltip>
        </Box>
      ))}
    </Flex>
  );
};

export const RiskLegend = (props: RiskCardsProps) => {
  props = { ...defaultRiskCardsProps, ...props };
  return (
    <Flex gap="2">
      {props.risks.map((risk) => (
        <Box key={risk.title}>
          <Tooltip content={`Risk Score: ${risk.score.toFixed(2)}`}>
            <Box display="inline-block">
              <RiskLegendCard
                title={risk.title}
                score={risk.score}
                scale={props.scale || "diagnostic"}
              />
            </Box>
          </Tooltip>
        </Box>
      ))}
    </Flex>
  );
};
