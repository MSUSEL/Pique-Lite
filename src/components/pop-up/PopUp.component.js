import React from 'react';
import {Content, Close} from './PopUp.styles';
import {FaRegWindowClose} from 'react-icons/fa'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import SingleFileUploadComponent from './SingleFileUpload.component';
import MultipleFileUpload from './MultipleFileUpload.component';
import FileDnDComponent from '../projectsDragAndDrop/FileDnD.component';
import EditorButton from '../editorButtion/EditorButton.component'
import FormInput from '../formInput/FormInput.component';
import { selectProjectName, selectProjectOwner } from '../../redux/projectInfo/ProjectInfo.selector';
const Popup = ({toggle, projectName, projectOwner, setProjectName, setProjectOwner}) => {
    const [show, setShow] = React.useState(false);
    return(
        <Content>
            <Close> 
                <FaRegWindowClose onClick={toggle}/>
            </Close>    
            <div>
                <SingleFileUploadComponent/>
            </div>
            <div>
                <MultipleFileUpload/>
            </div>
            <EditorButton onClick={() => setShow(!show)}>Sort Uploaded Files</EditorButton>
            {show ? <FileDnDComponent/> : null}
           
        </Content>
    )
}
const mapStateToProps = createStructuredSelector({
    projects: selectProjects,
    projectName: selectProjectName,
    projectOwner: selectProjectOwner
})
const mapDispatchToProps = dispatch => ({
    setProjectName: data => dispatch(selectProjectName(data)),
    setProjectOwner:  data => dispatch(selectProjectOwner(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Popup);