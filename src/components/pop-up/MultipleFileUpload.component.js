import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { removeFile, setProjects } from '../../redux/piqueTree/PiqueTree.actions';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import { readAllFiles } from '../../utils/fileUpload.utils';
import FileBlock from '../fileBlock/FileBlock.component';
import { LoaderWrapper, Label, Input} from './MultipleFileUpload.styles'

const MultipleFilesUpload = ({projects, setProjects}) => {

    const handleUpload = async (e) => {
        let allFiles = [];
        [...e.target.files].filter(file => file.size !== 0).map(file=> allFiles.push(file))
        console.log(allFiles)
        const results = await readAllFiles(allFiles);
        console.log(results)
        setProjects(results)
    }

    return (
        <div>
        <LoaderWrapper>
        <Label>
            <i>Upload Multiple Files</i>
            <Input 
                type="file" 
                accept=".json" 
                multiple={true} 
                onChange={handleUpload}
            />
        </Label>

    </LoaderWrapper>
    { projects ? projects.map((file, index) => {
        return <FileBlock 
                    key={index} 
                    fileName={file.fileName} 
                    versionNumber={file.versionNumber}
                    file={file}
                    />
    }) : null}
        </div>

     )
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})

const mapDispatchToProps = dispatch => ({
    setProjects: data => dispatch(setProjects(data)),
    removeFile: data => dispatch(removeFile(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(MultipleFilesUpload)