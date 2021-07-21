import React, {useEffect} from 'react';
import { Grid, TreeEditor, TreeView } from './Evalute.styles';
import TreeEditorComponent from '../../../components/treeEditor/TreeEditor.component';
import {EXAMPLE_DATA} from '../../../Evaluate-Pique-data-files/example.data';
import {connect} from 'react-redux';
import {setProjects} from '../../../redux/piqueTree/PiqueTree.actions'

const Evaluate = ({setProjects}) => {
    const [showEditor, setShowEditor] = React.useState(false);
    const showButton = () => setShowEditor(!showEditor);
    useEffect(() => {setProjects(EXAMPLE_DATA)}, [])
    return (
        <Grid isOpen={showEditor}>
            <TreeEditor>
                <TreeEditorComponent/>
            </TreeEditor>
            <TreeView>
                <button onClick={showButton}>
                    {showEditor ? "Close Editor" : "Open Editor"}
                </button>
            </TreeView>
        </Grid>
    )
}
const  mapDispatchToProps  = dispatch => ({
    setProjects: data => dispatch(setProjects(data))
})
export default connect(null,  mapDispatchToProps)(Evaluate);