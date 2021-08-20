import { createSelector } from "reselect";

const projectInfo = state => state.projectInfo;

export const selectProjectName = createSelector(
    [projectInfo],
    projectInfo => projectInfo.projectName
)

export const selectProjectOwner = createSelector(
    [projectInfo],
    projectInfo => projectInfo.projectOwner
)