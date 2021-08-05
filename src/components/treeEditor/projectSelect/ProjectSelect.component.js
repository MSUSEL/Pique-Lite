import React from 'react';
import { createStructuredSelector } from 'reselect';
import EditorButton from '../../editorButtion/EditorButton.component';
import {selectProjects} from '../../../redux/piqueTree/PiqueTree.selector';
import { connect } from 'react-redux';
import { setPiqueTree, setProjectName } from '../../../redux/piqueTree/PiqueTree.actions';
import {Container, Arrow} from './ProjectSelect.styles';
import {IoMdArrowDropdown} from "react-icons/all";
import {IoMdArrowDropup} from "react-icons/all";

const ProjectSelect= ({projects, setProjectName, setPiqueTree}) => {
    const [isListOpen, setIsListOpen] = React.useState(false);
    return (
        <div>
            <div>
                <EditorButton onClick={() => setIsListOpen(!isListOpen)}>
                    <Container>
                        Show Projects
                        {isListOpen
                            ? <Arrow><IoMdArrowDropup/></Arrow>
                            : <Arrow><IoMdArrowDropdown/></Arrow>
                        }
                    </Container>
                </EditorButton>
            </div>
            {isListOpen && projects.map((p, i) => <EditorButton key={i} onClick={
                () => {
                    setProjectName(p.fileName); 
                    setPiqueTree(p.fileContent)
                }}>
                    {p.fileName}
                 </EditorButton>)
        }
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