import { createSelector } from "reselect";

const selectFileList = state => state.fileList;

export const selectFile= createSelector(
    [selectFileList],
    fileList => fileList.fileList
)