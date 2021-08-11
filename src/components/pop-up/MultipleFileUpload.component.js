import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setProjects } from '../../redux/piqueTree/PiqueTree.actions';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import { readAllFiles } from '../../utils/fileUpload.utils';
import FileBlock from '../fileBlock/FileBlock.component';

const MultipleFilesUpload = ({projects, setProjects}) => {

    const handleUpload = async (e) => {
        let allFiles = [];
        [...e.target.files].map(file => allFiles.push(file));
        const results = await readAllFiles(allFiles);
        setProjects(results)
    }

    return (
        <div>
            <label>Upload all files</label>
            <input type="file" placeholder="upload all file" accept=".json" multiple={true} onChange={handleUpload}/>
            { projects ? projects.map((file, index) => {
                return <FileBlock key={index} fileName={file.fileName} versionNumber={file.versionNumber}/>
            }) : null}
        </div>
     )
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})

const mapDispatchToProps = dispatch => ({
    setProjects: data => dispatch(setProjects(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(MultipleFilesUpload)