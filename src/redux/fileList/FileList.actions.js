import FileListActionTypes from './FileList.actionTypes';

export const setFileList = (list) => ({
    type: FileListActionTypes.SET_FILE_LIST,
    payload: list
})