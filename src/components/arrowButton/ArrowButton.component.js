import React from 'react';
import { Container, Arrow} from './ArrowButton.styles'
import {IoMdArrowDropdown} from "react-icons/io";
import {IoMdArrowDropup} from "react-icons/io"
import EditorButtion from '../editorButtion/EditorButton.component';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import { connect } from 'react-redux';

const ArrowButton = ({children, projects}) => {
    const [show, setShow] = React.useState(false);
    return (
        <div>
            <EditorButtion  onClick={() => setShow(!show)}>
                <Container>
                    {children}
                    {show
                    ? <Arrow><IoMdArrowDropup/></Arrow>
                    : <Arrow><IoMdArrowDropdown/></Arrow>
                    }
                </Container>
            </EditorButtion>
            {show && projects.map((p, i) => 
                <EditorButtion key={i} 
                    onClick={
                    () => {
                        
                    }}
                >
                    {`v${p.versionNumber}`}
                </EditorButtion>)
            }
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})
export default connect(mapStateToProps)(ArrowButton)