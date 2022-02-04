import {createSelector}  from "reselect";

const fileInfo = state => state.fileInfo;

export const selectFileName = createSelector(
    [fileInfo],
    fileInfo => fileInfo.fileName
)

export const selectFileContent = createSelector(
    [fileInfo],
    fileInfo => fileInfo.fileContentList
)

export const selectSingleFileContent = createSelector(
    [fileInfo],
    fileInfo => fileInfo.singleFileContent
)