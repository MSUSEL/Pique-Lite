import React from 'react';
import {Content, Close} from './PopUp.styles';
import {FaRegWindowClose} from 'react-icons/fa'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import SingleFileUploadComponent from './SingleFileUpload.component';
import MultipleFileUpload from './MultipleFileUpload.component';
import EditorButton from '../editorButtion/EditorButton.component'
import { selectProjectName, selectProjectOwner } from '../../redux/projectInfo/ProjectInfo.selector';
import ProjectList from './ProjectList.component';


const Popup = ({toggle}) => {
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
            {show ? <ProjectList/> : null}
           
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