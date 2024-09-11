import React, { useState } from 'react';
import EditorButton from '../editorButtion/EditorButton.component';
import NeighborNodesComponent from './neighbornodes/NeighborNodes.component';
import OrientationComponent from './orientation/Orientation.component';
import ProjectSelectComponent from './projectSelect/ProjectSelect.component';
import RiskLevelSelectComponent from './riskLevelSelect/RiskLevelSelect.component';
import { Container } from './TreeEditor.styles';
import Popup from '../pop-up/PopUp.component';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const TreeEditor = () => {
    const riskLevelOptions = [   
                {
                    label: 'Severe',
                    value: '#FEEBEC'
                },
                {
                    label: 'High',
                    value: '#FFEFD6'
                },
                {
                    label: 'Medium',
                    value: '#FFFAB8'
                },
                {
                    label: 'Low',
                    value: '#E6F4FE'
                },
                {
                    label: 'Insignificant',
                    value: '#E6F6EB'
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
    const [showPopup, setShowPopup] = useState(false);
    const [openDialog, setOpenDialog] = useState({ upload: false, project: false, risk: false, orientation: false, neighbor: false });

    const togglePopup = () => setShowPopup(!showPopup);

    const handleDialogOpen = (type) => setOpenDialog({ ...openDialog, [type]: true });
    const handleDialogClose = (type) => setOpenDialog({ ...openDialog, [type]: false });

    return (
        <Container>
            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                <Button variant="outlined" onClick={togglePopup}>Upload Files</Button>
                {showPopup && <Popup toggle={togglePopup} />}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="outlined" onClick={() => handleDialogOpen('project')}>Pick An Existing Project to Visualize</Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="outlined" onClick={() => handleDialogOpen('risk')}>Pick a Risk Level</Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="outlined" onClick={() => handleDialogOpen('orientation')}>Select Orientation</Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Button variant="outlined" onClick={() => handleDialogOpen('neighbor')}>Collapse Same Level Nodes</Button>
            </div>

            {/* Dialog for Upload Files */}
            <Dialog open={openDialog.upload} onClose={() => handleDialogClose('upload')}>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogContent>
                    <EditorButton onClick={togglePopup}>Upload</EditorButton>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose('upload')}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Picking Project */}
            <Dialog open={openDialog.project} onClose={() => handleDialogClose('project')}>
                <DialogTitle>Pick An Existing Project to Visualize</DialogTitle>
                <DialogContent>
                    <ProjectSelectComponent />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose('project')}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Risk Level */}
            <Dialog open={openDialog.risk} onClose={() => handleDialogClose('risk')}>
                <DialogTitle>Pick a Risk Level</DialogTitle>
                <DialogContent>
                    <RiskLevelSelectComponent riskLevelOptions={riskLevelOptions} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose('risk')}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Orientation */}
            <Dialog open={openDialog.orientation} onClose={() => handleDialogClose('orientation')}>
                <DialogTitle>Select Orientation</DialogTitle>
                <DialogContent>
                    <OrientationComponent orientations={orientations} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose('orientation')}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Neighbor Nodes */}
            <Dialog open={openDialog.neighbor} onClose={() => handleDialogClose('neighbor')}>
                <DialogTitle>Collapse Same Level Nodes</DialogTitle>
                <DialogContent>
                    <NeighborNodesComponent />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose('neighbor')}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TreeEditor;