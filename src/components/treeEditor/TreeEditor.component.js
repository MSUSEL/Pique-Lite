import React from 'react';
import EditorButton from '../editorButtion/EditorButton.component';
import NeighborNodesComponent from './neighbornodes/NeighborNodes.component';
import OrientationComponent from './orientation/Orientation.component';
import ProjectSelectComponent from './projectSelect/ProjectSelect.component';
import RiskLevelSelectComponent from './riskLevelSelect/RiskLevelSelect.component';
import { Container, Span } from './TreeEditor.styles';

const TreeEditor = () => {
    const riskLevelOptions = [
        {
            label: "Dark Red",
            value: "dark red"
        },
        {
            label: "Red",
            value: "red"
        },
        {
            label: "Yellow",
            value: "yellow",
        },
        {
            label: "Green",
            value: "green"
        },
        {
            label: "All Color",
            value: ''
        }    
    ]

    const orientations = [
        {
            label: "Horizontal",
            value: "horizontal"
        },
        {
            label: "Vertical",
            value: "Vertical"
        }
    ]

    return (
        <Container>
            <Span>Pick An Exisiting Project to Visualize</Span>
            <ProjectSelectComponent/>
            <Span>Pick a Risk Level</Span>
            <RiskLevelSelectComponent riskLevelOptions={riskLevelOptions}/>
            <Span>Select Orientation</Span>
            <OrientationComponent orientations={orientations}/>
            <Span>Collapse Same Level Nodes</Span>
            <NeighborNodesComponent/>

        </Container>
    )
}

export default TreeEditor;