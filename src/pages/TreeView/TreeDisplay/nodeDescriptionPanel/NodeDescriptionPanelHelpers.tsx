import "./NodeDescriptionPanel.css";
import {ExternalLinkIcon, ArrowBottomRightIcon} from '@radix-ui/react-icons'

// import linear from "./linearLine.PNG";
// import gaussian from "./gaussianLine.PNG";
// import linear from "../../../assets/linearLine.png";
// import gaussian from "../../../assets/gaussianLine.png";
// import gam from "../../../assets/gamLine.png";

const ExternalLink = ({ href, children }) => (
  <a className="external-link" href={href} target="_blank">
    {children} <ExternalLinkIcon className="external-link-icon" />
  </a>
);

export function determineNodeInfo(node, impacts) {
  const node_type = determineNodeType();

  function determineNodeType() {
    if (node.name.includes("Measure")) return "Measure";
    else if (node.name.includes("Diagnostic")) return "Diagnostic";
    else if (node.name.includes("Category")) return "Product Factor";
    else if (node.name) return "TQI";
    else return "Quality Aspect";
  }

  function getThresholds() {
    const thresholds_array = node.thresholds;
    let thresholds = "";
    for (let i = 0; i < thresholds_array.length; i++) {
      thresholds +=
        (thresholds_array[i] === 0 ? "0" : thresholds_array[i].toFixed(4)) +
        ",";
    }
    thresholds = thresholds.substring(0, thresholds.length - 1);
    return thresholds;
  }

  function getCorrectNumberWithSuffix(num) {
    const last_digit = num % 10;
    switch (last_digit) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      default:
        return last_digit + "th";
    }
  }

  function getQualityImpactScore() {
    if (
      node_type === "Quality Aspect" ||
      node_type === "Product Factor" ||
      node_type === "Measure"
    ) {
      return (
        <div>
          <b>Quality Impact Score: </b>
          {impacts[node_type][node.name].value !== 0 ? (
            <>
              {impacts[node_type][node.name].value.toFixed(4)}
              <i style={{ paddingLeft: "0.5vw" }}>
                (Ranked{" "}
                {getCorrectNumberWithSuffix(impacts[node_type][node.name].rank)}{" "}
                highest of {Object.keys(impacts[node_type]).length} {node_type}
                s)
              </i>
            </>
          ) : (
            0
          )}
        </div>
      );
    }
  }
  
  const renderObjectDetails = (obj, keyPrefix = "") => {
    return (
      <div className="object-details">
        {Object.keys(obj).map(key => (
          <div key={`${keyPrefix}${key}`} className="object-key">
            <strong>{key}: </strong> 
            {typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key]) && (
              <ArrowBottomRightIcon className="arrow-icon"/>
            )}
            {typeof obj[key] === "string" ? (
              <span className="object-value">{obj[key]}</span>
            ) : (
              <div className={typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key]) ? "object-value hidden" : "object-value"}>
                {renderValue(obj[key])}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  
  const renderValue = value => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return renderObjectDetails(value);
    } else {
      return value.toString();
    }
  };
  
  
function renderUtilityFunction() {
  const utilityFunction = node.utility_function;

  if (typeof utilityFunction === 'string') {
    return (
      <div className="info-block">
        <b>Utility Function: </b>
        {utilityFunction} <ExternalLink href="https://github.com/MSUSEL/msusel-pique-visualizer" />
      </div>
    );
  } else if (typeof utilityFunction === 'object' && utilityFunction !== null) {
    return (
      
      <div className="info-block">
        <div style={{ paddingLeft: "20px" }}>
          {renderObjectDetails(utilityFunction)}
        </div>
      </div>
    );
  }
}
  

  // change the name of the node when it is created as well as the image associated with gam
  // TO DO: change the height and width to change as the screen size changes
  // TO DO: Test the changes of adding the class name

  // function graphImage() {
  //   if (node.utility_function === "pique.evaluation.DefaultUtility") {
  //     // return <img src={linear} alt="Linear Graph" width={30} height={30} />;
  //     return <span>linear</span>;
  //     //return ( <img src={linear} alt="Linear Graph" width={20} height={20}/> );
  //   } else if (node.utility_function === "evaluator.BinaryUtility") {
  //     // return <img src={linear} alt="Linear Graph" width={30} height={30} />;
  //     return <span>linear</span>;
  //   } else if (node.utility_function === "pique.evaluation.GaussianUtility") {
  //     // return <img src={gaussian} alt="Gaussian Graph" width={40} height={20} />;
  //     return <span>gaussian</span>;
  //   } else if (node.utility_function === "pique.evaluation.GamUtility") {
  //     // return <img src={gam} alt="Gamutility Graph" width={30} height={30} />;
  //     return <span>gam</span>;
  //   }
  // }
  

  return (
    <>
      <div className="node-name">{node.name}</div>
      <div className="node-info">
      <div className="info-block"> 
          <b>Node Type: </b>
          {node_type} <ExternalLink href="https://github.com/MSUSEL/msusel-pique-visualizer" />
        </div>
        <div className="info-block"> 
          <b>Value: </b>
          {node.value.toFixed(5)} <ExternalLink href="https://github.com/MSUSEL/msusel-pique-visualizer" />
        </div>
        {node.description !== "" ? (
          <div className="info-block"> 
            <b>Description: </b>
            {node.description} <ExternalLink href="https://github.com/MSUSEL/msusel-pique-visualizer" />
          </div>
        ) : null}
        <div className="info-block"> 
        {getQualityImpactScore()} 
        </div>
        {node_type === "Measure" ? (
          <div className="info-block"> 
            <b>Thresholds: </b>[{getThresholds(node)}] <ExternalLink href="https://github.com/MSUSEL/msusel-pique-visualizer" />
          </div>
        ) : null}
        {node_type === "Diagnostic" ? (
          <div className="info-block"> 
            <b>Tool: </b>
            {node.toolName} <ExternalLink href="https://github.com/MSUSEL/msusel-pique-visualizer" />
          </div>
        ) : null}
        <div className="info-block"> 
          <b>Evaluation Strategy: </b>
          {node.eval_strategy} <ExternalLink href="https://github.com/MSUSEL/msusel-pique-visualizer" />
        </div>
        <div className="info-block"> 
          <b>Normalizer: </b>
          {node.normalizer} <ExternalLink href="https://github.com/MSUSEL/msusel-pique-visualizer" />
        </div>
        <div className="utility-block">
          <b className="utility-text"> Utility Function: </b>
          <ArrowBottomRightIcon className="arrow-icon"/>
          <div className="utility-details">
          {renderUtilityFunction()}
          </div>
        </div>
      </div>
    </>
  );
}