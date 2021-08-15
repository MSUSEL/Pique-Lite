import React from 'react';
import {Content, Close} from './PopUp.styles';
import {FaRegWindowClose} from 'react-icons/fa'
import { removeFile, setProjects, setVersions } from '../../redux/piqueTree/PiqueTree.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProjects, selectVersions } from '../../redux/piqueTree/PiqueTree.selector';
import SingleFileUploadComponent from './SingleFileUpload.component';
import ProjectsSorting from '../projectsDragAndDrop/ProjectSorting.compoent';

const Popup = ({toggle, projects, setProjects, removeFile, versions, setVersions}) => {
    return(
        <Content>
            <Close> 
                <FaRegWindowClose onClick={toggle}/>
            </Close>
            <div>
                <SingleFileUploadComponent/>
            </div>
            <div>
                {projects ? <ProjectsSorting/> : null}
            </div>
           
        </Content>
    )
}
const mapStateToProps = createStructuredSelector({
    projects: selectProjects,
    versions: selectVersions
})
const mapDispatchToProps = dispatch => ({
    setProjects: data => dispatch(setProjects(data)),
    removeFile: data => dispatch(removeFile(data)),
    setVersions: data => dispatch(setVersions(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Popup);