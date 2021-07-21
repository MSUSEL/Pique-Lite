import React from 'react';
import {Button} from './EditorButton.styles'
const EditorButton = ({ children, ...props }) => (
    <Button {...props}> {children} </Button>
);

export default EditorButton;