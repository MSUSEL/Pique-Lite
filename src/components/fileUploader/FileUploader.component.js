import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FileUploaderContainer, Input, ButtonGroupContainer} from './FIleUploader.styles';
import EditorButton from '../editorButtion/EditorButton.component'
import { selectProjects } from '../../redux/piqueTree/PiqueTree.selector';
import { removeFile, setProjects } from '../../redux/piqueTree/PiqueTree.actions';
const FileUploader = ({projects, setProjects, removeFile}) => {
    // read the contents of each file
    const readFileContents = async (file) => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            // start reading the file, once done, the result contains the content of the file as text string
            fileReader.readAsText(file);
            fileReader.onload = () => {
                // result is a domstring, parse
                resolve(JSON.parse(fileReader.result));
            };
            fileReader.onerror = reject;
        })
    }

    const readAllFiles = async (allFiles) => {
        const results = await Promise.all(
            allFiles.map(async (file) => {
                const fileContent = await readFileContents(file);
                return {
                    "fileName": file.name,
                    "fileContent": fileContent
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
   return (
      
       <FileUploaderContainer>
            <h2>Upload files</h2>
            <Input type='file' multiple={true} accept=".json" onChange={handleUpload}/>
            {projects 
                ? <div>{projects.map((f, i) => 
                <ButtonGroupContainer key={i}>
                    <p>{f.fileName}</p>
                    <EditorButton onClick={() => removeFile(f)}>Remove</EditorButton>
                </ButtonGroupContainer>
                )}
                </div> 
                : null
            }
       </FileUploaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    projects: selectProjects
})

const mapDispatchToProps = dispatch => ({
    setProjects: list => dispatch(setProjects(list)),
    removeFile: file => dispatch(removeFile(file))
})
export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);