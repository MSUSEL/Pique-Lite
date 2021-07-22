import FileListActionTypes from "./FileList.actionTypes";
const INITIAL_STATE = {
    fileList : []
}

const FileListReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case FileListActionTypes.SET_FILE_LIST:
            return {
                ...state,
                fileList: action.payload
            }
        default:
            return state;
    }
}

export default FileListReducer;