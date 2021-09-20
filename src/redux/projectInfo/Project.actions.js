import ProjectInfoActionTypes from './ProjectInfo.actionTypes'

export const setProjectName = (data) => ({
    type: ProjectInfoActionTypes.SET_PROJECT_NAME,
    payload: data
});

export const setProjectOwner = (data) => ({
    type: ProjectInfoActionTypes.SET_PROJECT_OWNER,
    payload: data
})

export const setBranchName = (data) => ({
    type: ProjectInfoActionTypes.SET_BRANCH_NAME,
    payload: data
})

