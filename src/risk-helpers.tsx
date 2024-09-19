import React from "react";
import { IoSkullOutline } from "react-icons/io5";
import { ImWarning } from "react-icons/im";
import { RiAlarmWarningLine } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";

interface RiskLevel {
  name: string;
  color: string;
  icon: React.ReactNode;
  fontColor: string;
  badgeColor: string;
  normalRange: [number, number];
  diagnosticRange: [number, number];
}

const RISK_LEVELS: RiskLevel[] = [
  {
    name: "Severe",
    color: "#f3000d80",
    fontColor: "red",
    badgeColor: "#CD161C",
    icon: <IoSkullOutline />,
    normalRange: [0, 0.2],
    diagnosticRange: [1.5, Infinity],
  },
  {
    name: "High",
    color: "#ff8c0080",
    fontColor: "orange",
    badgeColor: "#CC4E00",
    icon: <RiAlarmWarningLine />,
    normalRange: [0.2, 0.4],
    diagnosticRange: [0.8, 1.5],
  },
  {
    name: "Elevated",
    color: "#ffee0080",
    fontColor: "yellow",
    badgeColor: "#9E6C00",
    icon: <CgDanger />,
    normalRange: [0.4, 0.6],
    diagnosticRange: [0.5, 0.8],
  },
  {
    name: "Guarded",
    color: "#008ff580",
    fontColor: "#0671CE",
    badgeColor: "#1D4EC6",
    icon: <ImWarning />,
    normalRange: [0.6, 0.8],
    diagnosticRange: [0.2, 0.5],
  },
  {
    name: "Low",
    color: "#00a43380",
    fontColor: "green",
    badgeColor: "green",
    icon: <RiSecurePaymentLine />,
    normalRange: [0.8, 1],
    diagnosticRange: [0, 0.2],
  },
];

function isInRange(value: number, range: [number, number]): boolean {
  const [min, max] = range;
  if (min === -Infinity && max === Infinity) return true;
  if (min === -Infinity) return value <= max;
  if (max === Infinity) return value >= min;
  return value >= min && value <= max;
}

export function getRisk(
  score: number | string,
  scale: "normal" | "diagnostic" = "normal"
): RiskLevel {
  const value = typeof score === "number" ? score : parseFloat(score);
  const rangeKey = scale === "normal" ? "normalRange" : "diagnosticRange";

  const risk = RISK_LEVELS.find((level) => isInRange(value, level[rangeKey]));
  if (risk === undefined) {
    console.log(`score: ${score}, value: ${value}, risk: ${risk}`);
    throw new Error("Invalid score or scale");
  }

  return risk;
}

export function getAllRiskLevels(): RiskLevel[] {
  return RISK_LEVELS;
}
