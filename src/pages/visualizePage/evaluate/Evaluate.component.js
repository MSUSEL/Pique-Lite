import React from 'react';
import { Grid, TreeEditor, TreeView } from './Evalute.styles';
import TreeEditorComponent from '../../../components/treeEditor/TreeEditor.component';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTree } from '../../../redux/piqueTree/PiqueTree.selector';
import TreeVisualizer from '../../../components/treeVisualizer/TreeVisualizer.component'

const Evaluate = ({tree}) => {
    const [showEditor, setShowEditor] = React.useState(false);
    const showButton = () => setShowEditor(!showEditor);
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

export default connect(mapStateToProps)(Evaluate);