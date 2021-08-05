import React from 'react';
import { Container, Arrow} from './ArrowButton.styles'
import EditorButton from '../editorButtion/EditorButton.component';
import {IoMdArrowDropdown} from "react-icons/io";
import {IoMdArrowDropup} from "react-icons/io";

const ArrowButton = ({open, setOpen}) => {
    return (
        <EditorButton onClick={() => setOpen(!open)}>
        <Container>
            Show Projects
            {open
                ? <Arrow><IoMdArrowDropup/></Arrow>
                : <Arrow><IoMdArrowDropdown/></Arrow>
            }
        </Container>
        </EditorButton>
    )
}

export default ArrowButton;