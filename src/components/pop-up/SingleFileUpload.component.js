import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { removeFile, setProjects, setVersions } from "../../redux/piqueTree/PiqueTree.actions";
import { selectProjects, selectVersions } from "../../redux/piqueTree/PiqueTree.selector";
import { LoaderWrapper, Input, Label, SubmitButton, ResetButton} from './SingleFileUpload.styles'
import { readSingleFileContent } from "../../utils/fileUpload.utils";
import FormInput from "../formInput/FormInput.component";
import {Line} from 'rc-progress';
import { Green } from "../../utils/color";
import { useAlert } from 'react-alert';
import {setSingleFileContent} from '../../redux/fileInfo/FileInfo.actions'
import { Snackbar, Slide, Button } from '@mui/material';

const SingleFileUpload = ({projects, versions, setProjects, setVersions, setSingleFileContent}) => {
    const alert = useAlert();
    // states for file, version, progress, submitting;
    const [v, setV] = React.useState('');
    const [file, setFile] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const [submitting, setSubmitting] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    console.log(file)

    // onChange for upload a single file
    const handleSingleUpload = async (e) => {
        const content = await readSingleFileContent(e.target.files[0], setProgress);
        setFile({
            fileName: e.target.files[0].name,
            fileContent: content,
        })
        setSingleFileContent(content)
    }

    // onChange to handle version input
    const handleV = e => {
        setV(e.target.value)
        if (file !== null) {
            file["versionNumber"]=e.target.value
        } else{
            showSnackbar("You must upload a file first!");
        }
        
    }
    
    // onClick to handle submitting
    const handleSubmitting = () => {setSubmitting(!submitting)}

    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const SlideTransition = (props) => {
        return <Slide {...props} direction="up" />;
    };


    //validates inputs
    const handleValidation = () => {
        if (file === null ) {
            showSnackbar("You must select a file to upload!");
        } 
        if (v === '') {
            showSnackbar("You must enter a version number");
        }
        if (projects.includes(file)) {
            showSnackbar("This file already exists, please select a different one");
        }
        if (versions.includes(v)) {
            showSnackbar("This version number already exists, please give it a different version number");
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
            {progress && submitting ? <Line percent={progress} strokeWidth="1" strokeColor={Green.value}/> : null}
            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                TransitionComponent={SlideTransition}
                message={snackbarMessage}
                autoHideDuration={3000}
                action={
                    <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
                        CLOSE
                    </Button>
                }
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            />
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
    setVersions: data => dispatch(setVersions(data)),
    setSingleFileContent: file => dispatch(setSingleFileContent(file))
})
export default connect(mapStateToProps, mapDispatchToProps)(SingleFileUpload);