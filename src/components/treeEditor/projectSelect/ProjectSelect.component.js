import React from 'react';
import { createStructuredSelector } from 'reselect';
import EditorButton from '../../editorButtion/EditorButton.component';
import {selectProjects} from '../../../redux/piqueTree/PiqueTree.selector';
import { connect } from 'react-redux';
import { setPiqueTree, setProjectName } from '../../../redux/piqueTree/PiqueTree.actions';

const ProjectSelect= ({projects, setProjectName, setPiqueTree}) => {
    return (
        <div>
            {projects.map((p, i) => <EditorButton key={i} onClick={() => {setProjectName(p.projectName); setPiqueTree(p.json)}}>{p.projectName}</EditorButton>)}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})

const mapDispatchToProps = dispatch => ({
    setProjectName: data => dispatch(setProjectName(data)),
    setPiqueTree: data => dispatch(setPiqueTree(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelect);