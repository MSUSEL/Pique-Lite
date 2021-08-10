import React from 'react';
import {Content, Close, Input, ButtonGroupContainer, LoaderWrapper, Label, SubmitButton, ResetButton} from './PopUp.styles';
import {FaRegWindowClose} from 'react-icons/fa'
import { removeFile, setProjects, setVersions } from '../../redux/piqueTree/PiqueTree.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProjects, selectVersions } from '../../redux/piqueTree/PiqueTree.selector';
import {Line} from 'rc-progress';
import { Green } from '../../utils/color';
import ArrayForm from '../arrayFrom/ArrayFrom.compoent';
import MultipleFilesUpload from './MultipleFileUpload.component';

const Popup = ({toggle, projects, setProjects, removeFile, versions, setVersions}) => {
    // file and file content
   const [version, setVersion] = React.useState('');
   const [selectedFile, setSelectedFile] = React.useState(null);
   const [content, setContent] = React.useState(null);

   // progress bar
   const [progress, setProgress] = React.useState(0);
   const [submitting, setSubmitting] = React.useState(false);
   
   const handleSubmit = () => {setSubmitting(!submitting)};

   // set error message
   const [errorMessage, setErrorMessage] = React.useState("");
    
    // read the contents of each file
    const readFileContents = async (file) => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            // start reading the file, once done, the result contains the content of the file as text string
           
            fileReader.onload = () => {
                // result is a domstring, parse
                resolve(JSON.parse(fileReader.result));
            };
            fileReader.onprogress = function(data) {
                if (data.lengthComputable) {                                            
                    let result = parseInt( ((data.loaded / data.total) * 100), 10 );
                    setProgress(result)
                }
            }
            fileReader.onerror = reject;
            fileReader.readAsText(file);
        })
    }

    const readAllFiles = async (allFiles) => {
        const results = await Promise.all(
            allFiles.map(async (file, index) => {
                const fileContent = await readFileContents(file);
                return {
                    "fileName": file.name,
                    "fileContent": fileContent,
                    "version": index + 1
                }
            })
        );
        return results;
    }

    const handleUpload = async (e) => {
        let allFiles = [];
        [...e.target.files].map(file => allFiles.push(file));
        const results = await readAllFiles(allFiles);
        setProjects(results)
    }

    const handleSingleUpload = async (e) => {
        setSelectedFile(e.target.files[0]);
        const fileContent = await readFileContents(e.target.files[0]); 
        setContent(fileContent);

    }

    const handleSingleClick= () => {
     
        if (!String(version)) {
            alert("you must select a file and put in a version number, such as v1")
        }
       
        if (selectedFile !== null && version !== "") {
            projects.push({
                fileName: selectedFile.name,
                fileContent: content,
                versionNumber: version
            })
        } 
        setProjects(projects)


    }

    const handleVersions = (e) => {
     
        if (version !== ""){
            while(!versions.includes(version))
            versions.push({
                version: version
            })
        }
        setVersions(versions)
        if (versions.includes(version)) {
            setErrorMessage("This version name already exits!, please enter another one")
        }
    }

    return(
        <Content>
            <Close> 
                <FaRegWindowClose onClick={toggle}/>
            </Close>
            <LoaderWrapper>
                <span>
                    <Label>
                        <Input 
                            name="file" 
                            type='file' 
                            multiple={false} 
                            accept=".json" 
                            style={{display: "none"}} 
                            onChange={handleSingleUpload}
                            required
                            />
                        <i>Upload Single File</i>      
                    </Label>
                </span> 
                <Input 
                    type='text' 
                    placeholder="Version Number: v1" 
                    name="version" 
                    value={version} 
                    onChange={e => setVersion(e.target.value)}
                />
               
                <SubmitButton 
                    type="submit"
                    onClick={() => {handleSingleClick(); handleSubmit(); handleVersions()}}
                    disabled={submitting}
                    submit={submitting}
                >
                    Submit
                </SubmitButton>
                {submitting 
                    ? <ResetButton 
                        onClick={handleSubmit}
                        >Reset</ResetButton>
                    : null
            }
                
            </LoaderWrapper>
            {errorMessage ? <p>{errorMessage}</p> : null}
            {progress && submitting ? <Line percent={progress} strokeWidth="4" strokeColor={Green.value}/> : null}
               
            {projects 
                ? <div>{
                    projects.map((f, i) => { 
                
                        return (
                            <ButtonGroupContainer key={i}>
                            <p>[Version Number: {f.versionNumber}]</p>
                            <p>{f.fileName}</p>
                            <button onClick={() => removeFile(f)}>Remove</button>
                            </ButtonGroupContainer>
                            )
                    }
                )}
                </div> 
                : null
            }
            
            <div>
              <MultipleFilesUpload/>
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