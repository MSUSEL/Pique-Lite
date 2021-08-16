import React from 'react';
import {Content, Close} from './PopUp.styles';
import {FaRegWindowClose} from 'react-icons/fa'
import { removeFile, setProjects, setVersions } from '../../redux/piqueTree/PiqueTree.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProjects, selectVersions } from '../../redux/piqueTree/PiqueTree.selector';
import SingleFileUploadComponent from './SingleFileUpload.component';
import ProjectsSorting from '../projectsDragAndDrop/ProjectSorting.compoent';
import MultipleFileUpload from './MultipleFileUpload.component';
import FilesDNDListComponent from '../projectsDragAndDrop/FilesDNDList.component';

const Popup = ({toggle, projects, setProjects, removeFile, versions, setVersions}) => {
    console.log(projects)
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
            <div>
                <h3>Resorting your list</h3>
                <FilesDNDListComponent/>
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