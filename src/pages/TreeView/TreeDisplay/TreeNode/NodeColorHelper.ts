/*
    "Paraphrased" code from Xuying's PIQUE-lite for the color code - thanks Xuying!
    Converted to TypeScript and made color mode aware
 */

// Legacy color definitions - kept for fallback compatibility
const Severe = {
  name: "Severe",
  color: "#f3000d80",
};
const High = {
  name: "High", 
  color: "#ff9c0080",
};
const Elevated = {
  name: "Elevated",
  color: "#ffee0080",
};
const Guarded = {
  name: "Guarded",
  color: "#008ff580",
};
const Low = {
  name: "Low",
  color: "#00a43380",
};

// Set legacy CSS custom properties for backward compatibility
// Note: These will be overridden by ColorModeProvider
if (typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--severe-color', Severe.color);
  document.documentElement.style.setProperty('--high-color', High.color);
  document.documentElement.style.setProperty('--elevated-color', Elevated.color);
  document.documentElement.style.setProperty('--guarded-color', Guarded.color);
  document.documentElement.style.setProperty('--low-color', Low.color);
}

export default function NodeRiskColor(
  score: number | string, 
  name: string, 
  selectedNode: string, 
  scale: "normal" | "diagnostic" = "normal"
): string {
  // Check if the node is the selected node, return ivory
  if (name === selectedNode) {
    return "ivory";
  }

  const value = parseFloat(score.toString());

  // Use CSS custom properties that are set by ColorModeProvider
  // These will automatically respect the current color mode
  if (scale === "normal") {
    if (value <= 0.2) {
      return "var(--risk-severe-background, #f3000d80)";
    } else if (value <= 0.4) {
      return "var(--risk-high-background, #ff8c0080)";
    } else if (value <= 0.6) {
      return "var(--risk-elevated-background, #ffee0080)";
    } else if (value <= 0.8) {
      return "var(--risk-guarded-background, #008ff580)";
    } else if (value <= 1.0) {
      return "var(--risk-low-background, #00a43380)";
    } else {
      return "grey";
    }
  } else if (scale === "diagnostic") {
    if (value <= 0.2) {
      return "var(--risk-low-background, #00a43380)";
    } else if (value <= 0.5) {
      return "var(--risk-guarded-background, #008ff580)";
    } else if (value <= 0.8) {
      return "var(--risk-elevated-background, #ffee0080)";
    } else if (value <= 1.5) {
      return "var(--risk-high-background, #ff8c0080)";
    } else {
      return "var(--risk-severe-background, #f3000d80)";
    }
  }
  
  return "grey";
}

// Color-mode aware version for direct use with current color mode
export function getNodeRiskColorFromMode(
  score: number | string,
  name: string,
  selectedNode: string,
  colorMode: 'normal' | 'colorblind',
  scale: "normal" | "diagnostic" = "normal"
): string {
  // Check if the node is the selected node, return ivory
  if (name === selectedNode) {
    return "ivory";
  }

  const value = parseFloat(score.toString());
  
  // This function can be extended to directly use color mode values
  // For now, it relies on CSS custom properties being set correctly
  return NodeRiskColor(score, name, selectedNode, scale);
}