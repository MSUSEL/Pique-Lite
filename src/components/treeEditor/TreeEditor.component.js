import React from 'react';
import ProjectSelectComponent from './projectSelect/ProjectSelect.component';
import RiskLevelSelectComponent from './riskLevelSelect/RiskLevelSelect.component';
import { Container, Select, ButtonGroupContainer, Span } from './TreeEditor.styles';

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
        </Container>
    )
}

export default TreeEditor;