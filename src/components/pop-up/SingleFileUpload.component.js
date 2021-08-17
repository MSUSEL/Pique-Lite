import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { removeFile, setProjects, setVersions } from "../../redux/piqueTree/PiqueTree.actions";
import { selectProjects, selectVersions } from "../../redux/piqueTree/PiqueTree.selector";
import { LoaderWrapper, Input, Label, SubmitButton, ResetButton} from './SingleFileUpload.styles'
import { readSignleFileContent } from "../../utils/fileUpload.utils";
import FormInput from "../formInput/FormInput.component";
import {Line} from 'rc-progress';
import { Green } from "../../utils/color";
import { useAlert } from 'react-alert'

const SingleFileUpload = ({projects, versions, setProjects, setVersions}) => {
    const alert = useAlert();
    // states for file, version, progress, submitting;
    const [v, setV] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [submitting, setSubmitting] = React.useState(false);
    console.log(file)

    // onChange for upload a single file
    const handleSingleUpload = async (e) => {
        const content = await readSignleFileContent(e.target.files[0], setProgress);
        setFile({
            fileName: e.target.files[0].name,
            fileContent: content,
        })
    }

    // onChange to handle version input
    const handleV = e => {
        setV(e.target.value)
        if (file !== null) {
            file["versionNumber"]=e.target.value
        } else{
            alert.show("file content is null")
        }
        
    }
    
    // onClick to handle submitting
    const handleSubmitting = () => {setSubmitting(!submitting)}

    //validates inputs
    const handleValidation = () => {
        if (file === null ) {
            alert.show("You must select a file to upload!");
        } 
        if (v === '') {
            alert.show(" you mush enter a version number")
        }
        if (projects.includes(file)) {
            alert.show("This file already exists, please select a different one")
        }
        if (versions.includes(v)) {
            alert.show("this version number already exists, please give it different version number")
        }
    }

    // onClick to setprojects setVersions
    const handleSubmit = () => {
        handleValidation()
        if (v !== '' && file !== null && !projects.includes(file) && !versions.includes(v)) {
            versions.push(v);
            projects.push(file)
            setProjects(projects)
            setVersions(versions)
            handleSubmitting()
        }
    }

    return(
        <div> 
            <LoaderWrapper>
                <Label>
                     <Input
                        name="file" 
                        type='file' 
                        accept=".json" 
                        style={{display: "none"}} 
                        required
                        onChange={handleSingleUpload}
                    />
                    <i>Upload Single File</i>  
                </Label>
           
                <FormInput
                    type='text' 
                    label={"Version Number: v1"}
                    name="version"
                    value={v}
                    onChange={handleV}
                />
                <SubmitButton
                        type='submit' 
                        onClick={() => {handleSubmit()}}
                        disabled={submitting}
                        submit={submitting}
                    >
                        Submit
                </SubmitButton>
                {submitting ? <ResetButton onClick={handleSubmitting}>Reset</ResetButton> : null}
            </LoaderWrapper>
            {progress && submitting ? <Line percent={progress} strokeWidth="4" strokeColor={Green.value}/> : null}
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(SingleFileUpload);