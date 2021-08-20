import React from 'react';
import { useCenteredTree } from './TreeVisualizerHelper.utils'
import Tree from "react-d3-tree";
import * as s from '../../utils/color'
import { createStructuredSelector } from 'reselect';
import { selectNeighborNodes, selectOrientation, selectRiskLevel, selectTree } from '../../redux/piqueTree/PiqueTree.selector'
import { connect } from 'react-redux';
import { TreeNode, ArrowButton } from './TreeVisualizer.styles';
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Card from "@material-ui/core/Card";

const containerStyles = {
    width: "100vw",
    height: "100vh"
};

const nodeAllColor = (score) => {
    const num = Number(score)
     if (num <= 0.3 ){
       return {border: "1px solid black", backgroundColor: s.Red.value}
     } else if ( num > 0.3 && num <= 0.5 ){
       return {border: "1px solid black", backgroundColor: s.DarkRed.value}
     }else if ( num > 0.5 && num <= 0.7) {
      return {border: "1px solid black", backgroundColor: s.Yellow.value}
    }else if ( num > 0.7 && num <= 1.0 ) {
      return {border: "1px solid black", backgroundColor: s.Green.value}
    }else{
      return {border: "1px solid black", backgroundColor: "grey"}
    }
  }

  // change the coloe of the tree
  const nodeRiskColor = (score, riskLevel) => {
    const num = Number(score);
    if (num <= 0.3 && riskLevel === s.Red.name) {
      return {border: "1px solid black", backgroundColor: s.Red.value}
    } else if ( num > 0.3 && num <= 0.5 && riskLevel === s.DarkRed.name) {
      return {border: "1px solid black", backgroundColor: s.DarkRed.value}
    } else if ( num > 0.5 && num <= 0.7 && riskLevel === s.Yellow.name) {
      return {border: "1px solid black", backgroundColor: s.Yellow.value}
    } else if ( num > 0.7 && num <= 1.0 && riskLevel === s.Green.name) {
      return {border: "1px solid black", backgroundColor: s.Green.value}
    } else {
      return {border: "1px solid black", backgroundColor: "grey"}
    }
  }
  
  
const TreeVisualizer = ({riskLevel, tree, orientation, collapseNeighbornodes}) => {
    const [translate, containerRef] = useCenteredTree();
    const nodeSize = { x: 400, y: 300 };
    const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };
    const [open, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!open);
    };
  

    const renderForeignObjectNode = ({ nodeDatum, toggleNode, foreignObjectProps, riskLevel}) => (
      <g>
        <text fill="black" strokeWidth="1" x="20" y="-20">edge</text>
        <circle
          r="5"
        />
  
        <foreignObject {...foreignObjectProps}>
          <TreeNode style={
            riskLevel ? nodeRiskColor(nodeDatum.value, riskLevel) :
            nodeAllColor(nodeDatum.value)}
          >
            <Card></Card>
        </TreeNode>
        </foreignObject>
      </g>
    );

    return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={tree}
        translate={translate}
        orientation={orientation}
        nodeSize={nodeSize}
        shouldCollapseNeighborNodes={collapseNeighbornodes}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps, riskLevel})
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