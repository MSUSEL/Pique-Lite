
import FileInfoActionTypes from './FileInfoActionTypes';

const INITAIL_STATE = {
    fileName: "",
    singleFileContent: {},
    fileContentList: []
}

const FileInfo = (state = INITAIL_STATE, action) => {
    switch(action.type) {
        case FileInfoActionTypes.SET_FILE_NAME:
            return{
                ...state,
                fileName: action.payload
            }
        case FileInfoActionTypes.SET_FILE_CONTENT_LIST:
            return{
                ...state,
                fileContentList: action.payload
            }
        case FileInfoActionTypes.SET_SINGLE_FILE_CONTENT:
            return{
                ...state,
                singleFileContent: action.payload
            }
        default:
            return state;
    }
}

export default FileInfo;