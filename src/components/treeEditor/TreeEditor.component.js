import React from 'react';
import ProjectSelectComponent from './ProjectSelect.component';
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
        </Container>
    )
}

export default TreeEditor;