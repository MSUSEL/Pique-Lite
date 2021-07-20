
import './PiqueTableChart.css'
export const data = [
    ["Score", "Q1 2021", "Q2 2021", "Q3 2021", "Q2 2021"],
    ["TQI", { v:0.5}, { v:0.6}, { v:0.7}, { v:0.8}],
    ["Performance", { v:0.4}, { v:0.5}, { v:0.6}, { v:0.7}],
    ["Compatibility", { v:0.5}, { v:0.6}, { v:0.7}, { v:0.8}],
    ["Maintainability", { v:0.6}, { v:0.7}, { v:0.8}, { v:0.9}],
    ["Seucrity", { v:0.5}, { v:0.6}, { v:0.7}, { v:0.8}],
  ];

  var cssClassNames = {headerRow: 'bigAndBoldClass' ,
  hoverTableRow: 'highlightClass', tableRow: 'tableRowBackgroud', tableCell: 'gameCell'};

  export const options = {
    title: "Pique C# Model Result",
    curveType: "function",
    legend: { position: "bottom" },
    allowHtml: true,
    width: '100%', 
    height: '90%',
    cssClassNames: cssClassNames,
        
};

export const width="100%"
export const height="300px"
export const chartType="Table"

export const showButton = true;