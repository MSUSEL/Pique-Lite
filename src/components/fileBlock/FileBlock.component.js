import React from 'react';
import { FileContainer, FileVersion, FileName} from './FileBlock.styles';

const FileBlock = ({fileName, versionNumber})=> {
    return(
        <FileContainer>
            <FileVersion> v{versionNumber}</FileVersion>
            <FileName>{fileName}</FileName>
            <button>remove</button>
        </FileContainer>
    )
}
export default FileBlock;