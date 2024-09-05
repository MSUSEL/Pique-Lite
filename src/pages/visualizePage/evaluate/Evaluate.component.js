import React from 'react';
import { Grid, TreeEditor, TreeView } from './Evalute.styles';
import TreeEditorComponent from '../../../components/treeEditor/TreeEditor.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTree } from '../../../redux/piqueTree/PiqueTree.selector';
import TreeVisualizer from '../../../components/treeVisualizer/TreeVisualizer.component';

const Evaluate = ({ tree }) => {
    return (
        <Grid>
            <TreeEditor>
                <TreeEditorComponent />
            </TreeEditor>
                {tree ? <TreeVisualizer /> : null}
        </Grid>
    );
};

const mapStateToProps = createStructuredSelector({
    tree: selectTree
});

export default connect(mapStateToProps)(Evaluate);
