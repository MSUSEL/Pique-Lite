import FileInfoActionTypes from './FileInfoActionTypes';

export const SetFileName = (data) => ({
    type: FileInfoActionTypes.SET_FILE_NAME,
    payload: data
});

export const setFileContentList = (data) => ({
    type: FileInfoActionTypes.SET_FILE_CONTENT_LIST,
    payload: data
})

export const setSingleFileContent = (content) => ({
    type: FileInfoActionTypes.SET_SINGLE_FILE_CONTENT,
    payload: content
})