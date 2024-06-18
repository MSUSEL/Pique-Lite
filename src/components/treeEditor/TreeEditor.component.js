import React from 'react';
import EditorButton from '../editorButtion/EditorButton.component';
import NeighborNodesComponent from './neighbornodes/NeighborNodes.component';
import OrientationComponent from './orientation/Orientation.component';
import ProjectSelectComponent from './projectSelect/ProjectSelect.component';
import RiskLevelSelectComponent from './riskLevelSelect/RiskLevelSelect.component';
import { Container, Span } from './TreeEditor.styles';
import Popup from '../pop-up/PopUp.component';

const TreeEditor = () => {
    const riskLevelOptions = [   
                {
                    label: 'Severe',
                    value: '#cb0032'
                },
                {
                    label: 'High',
                    value: '#ff6500'
                },
                {
                    label: 'Medium',
                    value: '#fde101'
                },
                {
                    label: 'Low',
                    value: '#3566cd'
                },
                {
                    label: 'Insignificant',
                    value: '#009a66'
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

    const [show, setShow] = React.useState(false);

    const togglePopup = () => {setShow(!show)};

    return (
        <Container>
            <Span>Upload Files</Span>
            <EditorButton onClick={togglePopup}>Upload</EditorButton>
            {show ? <Popup toggle={togglePopup}/> : null}
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