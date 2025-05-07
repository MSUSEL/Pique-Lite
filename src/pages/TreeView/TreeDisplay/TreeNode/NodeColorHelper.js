/*
    "Paraphrased" code from Xuying's PIQUE-lite for the color code - thanks Xuying!
 */

const Severe = {
  name: "Severe",
  // color: "#E58F8F",
  color: "#f3000d80", //14
};
const High = {
  name: "High",
  // color: "#ffa500",
  color: "#ff9c0080", //29
};
const Elevated = {
  name: "Elevated",
  // color: "#E9DB7D",
  color: "#ffee0080", //47
};
const Guarded = {
  name: "Guarded",
  // color: "#8DB1E0",
  color: "#008ff580", //19
};
const Low = {
  name: "Low",
  // color: "#8FBC94",
  color: "#00a43380", //19
};

// Set CSS custom properties for each color
document.documentElement.style.setProperty('--severe-color', Severe.color);
document.documentElement.style.setProperty('--high-color', High.color);
document.documentElement.style.setProperty('--elevated-color', Elevated.color);
document.documentElement.style.setProperty('--guarded-color', Guarded.color);
document.documentElement.style.setProperty('--low-color', Low.color);

export default function NodeRiskColor(score, name, selectedNode, scale = "normal") {
  // Check if the node is the selected node, return ivory
  if (name === selectedNode) {
    return "ivory";
  }

  const value = parseFloat(score);

  if (scale === "normal") {
    if (value <= 0.2) {
      return Severe.color;
    } else if (value <= 0.4) {
      return High.color;
    } else if (value <= 0.6) {
      return Elevated.color;
    } else if (value <= 0.8) {
      return Guarded.color;
    } else if (value <= 1.0) {
      return Low.color;
    } else {
      return "grey";
    }
  } else if (scale === "diagnostic") {
    if (value <= 0.2) {
      return Low.color;
    } else if (value <= 0.5) {
      return Guarded.color;
    } else if (value <= 0.8) {
      return Elevated.color;
    } else if (value <= 1.5) {
      return High.color;
    } else {
      return Severe.color;
    }
  }
}
