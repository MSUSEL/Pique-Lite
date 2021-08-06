import React from 'react';
import {Content, Close, Input, ButtonGroupContainer, LoaderWrapper, Label, SubmitButton} from './PopUp.styles';
import {FaRegWindowClose} from 'react-icons/fa'
import { removeFile, setProjects } from '../../redux/piqueTree/PiqueTree.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import {Line} from 'rc-progress'


const Popup = ({toggle, projects, setProjects, removeFile}) => {
    // file and file content
   const [version, setVersion] = React.useState('');
   const [selectedFile, setSelectedFile] = React.useState(null);
   const [content, setContent] = React.useState(null);

   // progress bar
   const [progress, setProgress] = React.useState(0);
   const [submitting, setSubmitting] = React.useState(false);
   const [message, setMessage] = React.useState("");

    // read the contents of each file
    const readFileContents = async (file) => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            // start reading the file, once done, the result contains the content of the file as text string
            fileReader.readAsText(file);
            fileReader.onload = (e) => {
                // result is a domstring, parse
                resolve(JSON.parse(fileReader.result));
            };
            fileReader.onprogress = function(data) {
                if (data.lengthComputable) {                                            
                    let result = parseInt( ((data.loaded / data.total) * 100), 10 );
                    setProgress(result)
                    console.log(result)
                }
            }
            fileReader.onerror = reject;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!String(version)) {
            alert("you must select a file and put in a version number, such as v1")
        }
       
        if (selectedFile !== null && version !== "") {
            projects.push({
                fileName: selectedFile.name,
                fileContent: content,
                versionNumber: version
            })
            setProjects(projects)
        } 

    }

    return(
        <Content>
            <Close> 
                <FaRegWindowClose onClick={toggle}/>
            </Close>
            <LoaderWrapper>
            <form onSubmit={handleSubmit}>
                <span>
                    <Label>
                        <Input 
                            name="file" 
                            type='file' 
                            multiple={false} 
                            accept=".json" 
                            style={{display: "none"}} 
                            onChange={handleSingleUpload}
                            />
                        <i>Upload Single File</i>      
                    </Label>
                </span> 
                <Input type='text' placeholder="Version Number: v1" name="version" value={version} onChange={e => setVersion(e.target.value)}/>
                <SubmitButton type='submit' onClick={() => setSubmitting(!submitting)}>Submit</SubmitButton>
                               
            </form>
            </LoaderWrapper>

            {progress? <Line percent={progress} strokeWidth="4" strokeColor="green"/> : null}
               
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
                <h2>Upload files</h2>
                <Input type='file' multiple={true} accept=".json" onChange={handleUpload}/>
                {projects 
                    ? <div>{projects.map((f, i) => 
                    <ButtonGroupContainer key={i}>
                        <p>[Version Number: {f.versionNumber}]</p>
                        <p>{f.fileName}</p>
                        <button onClick={() => removeFile(f)}>Remove</button>
                    </ButtonGroupContainer>
                    )}
                    </div> 
                    : null
                }
            </div>
           
        </Content>
    )
}
const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})
const mapDispatchToProps = dispatch => ({
    setProjects: data => dispatch(setProjects(data)),
    removeFile: data => dispatch(removeFile(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Popup);