import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setFileList } from '../../redux/fileList/FileList.actions';
import { selectFile } from '../../redux/fileList/FileList.selector';
import { FileUploaderContainer, Input, ButtonGroupContainer} from './FIleUploader.styles';
import EditorButton from '../editorButtion/EditorButton.component'
const FileUploader = ({setFileList, fileList}) => {

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
                const fileContents = await readFileContents(file);
                return fileContents;
            })
        );
        console.log(results)
        return results;
    }

    const handleUpload = async (e) => {
        let allFiles = [];
        [...e.target.files].map(file => allFiles.push(file));
        const results = await readAllFiles(allFiles);

        setFileList(results)
    }

    return (
       <FileUploaderContainer>
            <h2>Upload files</h2>
            <Input type='file' multiple={true} accept=".json" onChange={handleUpload}/>
            {fileList 
                ? <div>{fileList.map((f, i) => 
                <ButtonGroupContainer key={i}>
                    <p >{f.name + " " + i}</p>
                    <EditorButton>Remove</EditorButton>
                </ButtonGroupContainer>
                )}
                </div> 
                : null
            }

            {fileList 
                ? <div>{fileList.map((f, i) => 
                <ButtonGroupContainer key={i}>
                  {f.name}
                </ButtonGroupContainer>
                )}
                </div> 
                : null
            }

       </FileUploaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    fileList: selectFile
})

const mapDispatchToProps = dispatch => ({
    setFileList: list => dispatch(setFileList(list))
})
export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);