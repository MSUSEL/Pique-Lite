import React from 'react';
import { connect } from 'react-redux';
import { setFileList } from '../../redux/fileList/FileList.actions';
import { FileUploaderContainer } from './FIleUploader.styles';

const FileUploader = ({setFileList}) => {
    return (
       <FileUploaderContainer>haha</FileUploaderContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    setFileList: list => dispatch(setFileList(list))
})
export default connect(null, mapDispatchToProps)(FileUploader);