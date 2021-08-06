import React from 'react';
import { Container, Arrow} from './ArrowButton.styles'
import {IoMdArrowDropdown} from "react-icons/io";
import {IoMdArrowDropup} from "react-icons/io"
import EditorButtion from '../editorButtion/EditorButton.component';

const ArrowButton = ({children}) => {
    const [show, setShow] = React.useState(false);
    return (
        <EditorButtion  onClick={() => setShow(!show)}>
            <Container>
            {children}
            {show
                ? <Arrow><IoMdArrowDropup/></Arrow>
                : <Arrow><IoMdArrowDropdown/></Arrow>
            }
            </Container>
        </EditorButtion>
    )
}
export default ArrowButton;