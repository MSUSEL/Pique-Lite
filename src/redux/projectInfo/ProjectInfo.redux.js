 import ProjectInfoActionTypes from './ProjectInfo.actionTypes'
const INITIAL_STATE = {
    projectName: "",
    projectOwner: "",
    branchName: [],
    commitName:[]
}

const ProjectInfo = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ProjectInfoActionTypes.SET_PROJECT_NAME:
            return{
                ...state,
                projectName: action.payload
            }
        case ProjectInfoActionTypes.SET_PROJECT_OWNER:
            return{
                ...state,
                projectOwner: action.payload
            }
        case ProjectInfoActionTypes.SET_BRANCH_NAME:
                return{
                    ...state,
                    branchName: action.payload
                }
        default:
            return state;
    }
}

export default ProjectInfo;

