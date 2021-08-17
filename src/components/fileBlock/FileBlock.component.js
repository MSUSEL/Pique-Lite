import React from 'react';
import { connect } from 'react-redux';
import { removeFile } from '../../redux/piqueTree/PiqueTree.actions';
import { FileContainer, FileVersion, FileName} from './FileBlock.styles';

const FileBlock = ({fileName, versionNumber, file, removeFile})=> {
    return(
        <FileContainer>
            <FileVersion> v{versionNumber}</FileVersion>
            <FileName>{fileName}</FileName>
            <button onClick={() => removeFile(file)}>remove</button>
        </FileContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    removeFile: data => dispatch(removeFile(data))
})
export default connect(null, mapDispatchToProps)(FileBlock)