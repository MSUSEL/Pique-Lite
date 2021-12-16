import React from 'react';
import { useCenteredTree } from './TreeVisualizerHelper.utils'
import Tree from "react-d3-tree";
import * as s from '../../utils/color'
import { createStructuredSelector } from 'reselect';
import { selectNeighborNodes, selectOrientation, selectRiskLevel, selectTree } from '../../redux/piqueTree/PiqueTree.selector'
import { connect } from 'react-redux';
import {RiFolderInfoLine} from 'react-icons/ri'

const containerStyles = {
    width: "100vw",
    height: "100vh"
};

const nodeAllColor = (score) => {
    const num = Number(score)
     if (num <= 0.2 ){
       return {border: "1px solid black", backgroundColor: s.Severe.color}
     } else if ( num > 0.2 && num <= 0.4 ){
       return {border: "1px solid black", backgroundColor: s.High.color}
     }else if ( num > 0.4 && num <= 0.6) {
      return {border: "1px solid black", backgroundColor: s.Elevated.color}
    }else if ( num > 0.6 && num <= 0.8) {
      return {border: "1px solid black", backgroundColor: s.Guarded.color}
    }else if ( num > 0.8 && num <= 1.0 ) {
      return {border: "1px solid black", backgroundColor: s.Low.color}
    }
    else{
      return {border: "1px solid black", backgroundColor: "grey"}
    }
  }

  // change the coloe of the tree
  const nodeRiskColor = (score, riskLevel) => {
    const num = Number(score);
    if (num <= 0.2 && riskLevel===s.Severe.color){
      return {border: "1px solid black", backgroundColor: s.Severe.color}
    } else if ( num > 0.2 && num <= 0.4  && riskLevel===s.High.color){
      return {border: "1px solid black", backgroundColor: s.High.color}
    }else if ( num > 0.4 && num <= 0.6 && riskLevel===s.Elevated.color) {
     return {border: "1px solid black", backgroundColor: s.Elevated.color}
   }else if ( num > 0.6 && num <= 0.8 && riskLevel===s.Guarded.color) {
     return {border: "1px solid black", backgroundColor: s.Guarded.color}
   }else if ( num > 0.8 && num <= 1.0 && riskLevel===s.Low.color) {
     return {border: "1px solid black", backgroundColor: s.Low.color}
   }
   else{
     return {border: "1px solid black", backgroundColor: "grey"}
   }
  }
  
  // Here we're using `renderCustomNodeElement` to represent each node
  // as an SVG `rect` instead of the default `circle`.
  const renderForeignObjectNode = ({ nodeDatum, toggleNode, foreignObjectProps, riskLevel}) => (
    <g>
      <text fill="black" strokeWidth="1" x="20" y="-20">edge: 0.45</text>
      <circle r="5"/>
      <foreignObject {...foreignObjectProps}>
        <div style={  riskLevel ? nodeRiskColor(nodeDatum.value, riskLevel) : nodeAllColor(nodeDatum.value)}>
          <RiFolderInfoLine style={{fontSize: "30px", color: "black"}} onClick={toggleNode}/>
          <p style={{ textAlign: "center", paddingLeft: "5px"}}>{"name: " + nodeDatum.name}</p>
          <p style={{ textAlign: "center", paddingLeft: "5px"}}>{"value: " + nodeDatum.value}</p>
          {nodeDatum.children && (
          <button style={{ width: "100%", backgroundColor: "#B9B7BD"}} onClick={toggleNode}>
            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
          </button>
          )}
        </div>
    </foreignObject>
  </g>
  );

const TreeVisualizer = ({riskLevel, tree, orientation, collapseNeighbornodes}) => {
    const [translate, containerRef] = useCenteredTree();
    const nodeSize = { x: 200, y: 200 };
    const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
  
    return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={tree}
        translate={translate}
        orientation={orientation}
        nodeSize={nodeSize}
        shouldCollapseNeighborNodes={collapseNeighbornodes}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({...rd3tProps, foreignObjectProps, riskLevel})
        }
      />
    </div>
    )
}

const mapStateToProps = createStructuredSelector({
    tree: selectTree, 
    riskLevel: selectRiskLevel,
    orientation: selectOrientation,
    neighborNodes: selectNeighborNodes
})
export default connect(mapStateToProps)(TreeVisualizer)