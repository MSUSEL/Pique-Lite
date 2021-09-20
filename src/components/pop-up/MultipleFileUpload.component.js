import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {  setProjects } from '../../redux/piqueTree/PiqueTree.actions';
import { readAllFiles } from '../../utils/fileUpload.utils';

import { LoaderWrapper, Label, Input, ProgressResult} from './MultipleFileUpload.styles';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import { Line } from 'rc-progress';
import { Green } from '../../utils/color';


const MultipleFilesUpload = ({projects, setProjects}) => {

    const [progress, setProcess] = React.useState(0)

    const handleUpload = async (e) => {
        let allFiles = [];
        [...e.target.files].filter(file => file.size !== 0).map(file=> allFiles.push(file))
        const results = await readAllFiles(allFiles, setProcess);
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
                {projects && progress ? (
                    projects.map((file, index) => {
                        return (
                            <div key={index}>
                                <p>v{file.versionNumber} {file.fileName}</p>
                                <Line percent={progress} strokeWidth="1" strokeColor={Green.value}/>
                            </div>
                        )
                    })
                ) : null}

        </div>

     )
}

const mapStateToProps = createStructuredSelector({
  projects: selectProjects
})

const mapDispatchToProps = dispatch => ({
    setProjects: data => dispatch(setProjects(data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MultipleFilesUpload)