import React, {useEffect} from 'react';
import { Grid, TreeEditor, TreeView } from './Evalute.styles';
import TreeEditorComponent from '../../../components/treeEditor/TreeEditor.component';
import {EXAMPLE_DATA} from '../../../Evaluate-Pique-data-files/example.data';
import {connect} from 'react-redux';
import {setProjects} from '../../../redux/piqueTree/PiqueTree.actions'
import { createStructuredSelector } from 'reselect';
import { selectTree } from '../../../redux/piqueTree/PiqueTree.selector';
import TreeVisualizer from '../../../components/treeVisualizer/TreeVisualizer.component'

const Evaluate = ({setProjects, tree}) => {
    const [showEditor, setShowEditor] = React.useState(false);
    const showButton = () => setShowEditor(!showEditor);
    useEffect(() => {setProjects(EXAMPLE_DATA)}, [setProjects])
    return (
        <Grid isOpen={showEditor}>
            <TreeEditor>
                <TreeEditorComponent/>
            </TreeEditor>
            <TreeView>
                <button onClick={showButton}>
                    {showEditor ? "Close Editor" : "Open Editor"}
                </button>

                {tree ? <TreeVisualizer/> : null}

            </TreeView>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    tree: selectTree
})
const  mapDispatchToProps  = dispatch => ({
    setProjects: data => dispatch(setProjects(data))
})
export default connect(mapStateToProps,  mapDispatchToProps)(Evaluate);