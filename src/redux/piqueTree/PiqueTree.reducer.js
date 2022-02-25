import PiqueTreeActionTypes from "./PiqueTree.actionTypes";

const INITIAL_STATE = {
    projects: [],
    versions: [],
    quarters: [],
    projectName: '',
    riskLevel: '',
    orientation: '',
    tree: null,
    neighborNodes: false,
    riskList: [] 
}
const PiqueTreeReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PiqueTreeActionTypes.SET_PROJECTS:
            return{
                ...state,
                projects: action.payload
            }
        case PiqueTreeActionTypes.SET_VERSIONS:
            return{
                ...state,
                versions: action.payload
            }
        case PiqueTreeActionTypes.SET_PROJECT_NAME:
            return {
                ...state,
                projectName: action.payload
            }
        case PiqueTreeActionTypes.SET_RISK_LEVEL:
            return {
                ...state,
                riskLevel: action.payload
            }
        case PiqueTreeActionTypes.SET_ORIENTATION:
            return {
                ...state,
                orientation: action.payload
            }
        case PiqueTreeActionTypes.SET_NEIGHBOR_NODES:
            return {
                ...state,
                neighborNodes: !state.neighborNodes
            }
        case PiqueTreeActionTypes.SET_PIQUE_TREE:
            return {
                ...state,
                tree: action.payload
            }
        case PiqueTreeActionTypes.REMOVE_FILE:
            return {
                ...state,
                projects: state.projects.filter(item => action.payload !== item),
            }
        case PiqueTreeActionTypes.SET_RISK_LIST:
            return {
                ...state,
                riskList: action.payload
            }
        case PiqueTreeActionTypes.SET_QUARTERS:
            return{
                ...state,
                quarters: action.payload
            }
        default:
            return state;
    }    
}

export default PiqueTreeReducer;
