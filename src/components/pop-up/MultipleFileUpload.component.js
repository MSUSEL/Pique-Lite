import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {  setProjects, setQFiles, setQuarters, setVersions } from '../../redux/piqueTree/PiqueTree.actions';
import { readAllFiles } from '../../utils/fileUpload.utils';

import { LoaderWrapper, Label, Input, SubmitButton, ResetButton} from './MultipleFileUpload.styles';
import { selectProjects, selectQuarters, selectVersions } from '../../redux/piqueTree/PiqueTree.selector';
import { Line } from 'rc-progress';
import { Green } from '../../utils/color';

import FormInput from '../formInput/FormInput.component';
import { useAlert } from 'react-alert'



const MultipleFilesUpload = ({projects, setProjects, quarters, setQuarters, versions, setVersions}) => {
    const alert = useAlert();
    const [progress, setProcess] = React.useState(0)
    const [quarterNumber, setQuarterNumber] = React.useState('');
    const [quarterFiles, setQuarterFiles] = React.useState([]);
    const [submitting, setSubmitting] = React.useState(false);
    const [file, setFile] = React.useState(null);

    const handleUpload = async (e) => {
        let allFiles = [];
        [...e.target.files].filter(file => file.size !== 0).map(file=> allFiles.push(file));
        const results = await readAllFiles(allFiles, setProcess);
        setQuarterFiles(results)
        setFile(results[results.length -1]);
    }
    console.log("filesss", quarterFiles);
       // onChange to handle version input
    const handleQuarterNumber = e => {
        setQuarterNumber(e.target.value)
        if (file !== null) {
            file["QuarterNumber"]=e.target.value
        } else{
            alert.show("file content is null")
        }
    }

    console.log("quarter number", quarterNumber)

    // onClick to handle submitting
    const handleSubmitting = () => {setSubmitting(!submitting)}

    const checker = (arr, target) => target.every(v => arr.includes(v));

    const checkFileInProjects =(arr, target) => {
        const checker = target.every(f => arr.includes(f));
        return checker;
    }

    //validates inputs
    const handleValidation = () => {
        if (quarterFiles === null ) {
            alert.show("You must select a file to upload!");
        } 
        if (quarterNumber === '') {
            alert.show(" you mush enter a quarter number")
        }
        if (checkFileInProjects(projects, quarterFiles)) {
            alert.show("These files already exist, please select a different one")
        }
        if (quarters.includes(quarterNumber)) {
            alert.show("this quarter number already exists, please give it a different quarter number")
        }
    }


     // onClick to setprojects setVersions
     const handleSubmit = () => {
        handleValidation()
        if (quarterNumber !== '' && quarterFiles !== null && !checker(projects, quarterFiles) && !quarters.includes(quarterNumber)) {
            quarters.push(quarterNumber);
            const combined = [...projects, ...quarterFiles]
            setQuarters(quarters)
            setProjects(combined)
            handleSubmitting()
        }
    }

   
    console.log("quarters ", quarters)
    console.log("submmitting", submitting)
    console.log("versions", versions)

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
                
                <FormInput
                    type='text'
                    label={"Quarter Number: Q1"}
                    name="quarter"
                    value={quarterNumber}
                    onChange={handleQuarterNumber}
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
                {projects && progress ? (
                    projects.map((file, index) => {
                        return (
                            <div key={index}>
                                <p>v{index + 1} {file.fileName}</p>
                                <Line percent={progress} strokeWidth="1" strokeColor={Green.value}/>
                            </div>
                        )
                    })
                ) : null}

        </div>

     )
}

const mapStateToProps = createStructuredSelector({
  projects: selectProjects,
  quarters: selectQuarters,
  versions: selectVersions
})

const mapDispatchToProps = dispatch => ({
    setProjects: data => dispatch(setProjects(data)),
    setQuarters: data => dispatch(setQuarters(data)),
    setQFiles: data => dispatch(setQFiles(data)),
    setVersions: data => dispatch(setVersions(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(MultipleFilesUpload)