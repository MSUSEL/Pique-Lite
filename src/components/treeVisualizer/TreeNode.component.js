import React from "react";
import { NodeLabel, InfoIcon } from "./TreeNode.styles";
import { RiFolderInfoLine } from "react-icons/ri";

const TreeNode = ({ nodeDatum, toggleNode, foreignObjectProps, riskLevel, nodeAllColor, nodeRiskColor}) => {

    return (
        <g>
            <text fill="black" strokeWidth="1" x="20" y="-20">edge: 0.45</text>
            <circle r="5"/>
            <foreignObject {...foreignObjectProps}>
                <NodeLabel style={
                    riskLevel ? nodeRiskColor(nodeDatum.value, riskLevel) :
                    nodeAllColor(nodeDatum.value)
                }>
                    <InfoIcon><RiFolderInfoLine/></InfoIcon> 
                    <h3 style={{ textAlign: "center" }}>{"name: " + nodeDatum.name}</h3>
                    <h3 style={{ textAlign: "center" }}>{"value: " + nodeDatum.value}</h3>
                {nodeDatum.children && (
                    <button style={{ width: "100%", backgroundColor: "#B9B7BD"}} onClick={toggleNode}>
                    {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
                    </button>
                )}
            </NodeLabel>       
            </foreignObject>
    </g>
    )


}

export default TreeNode;