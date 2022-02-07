import PiqueTreeActionTypes from "./PiqueTree.actionTypes";

export const setProjects = (data) => ({
    type: PiqueTreeActionTypes.SET_PROJECTS,
    payload: data
});

export const setVersions = (data) => ({
    type: PiqueTreeActionTypes.SET_VERSIONS,
    payload: data
});

export const setProjectName = (projectName) => ({
    type: PiqueTreeActionTypes.SET_PROJECT_NAME,
    payload: projectName
})

export const setRiskLevel = (riskLevel) => ({
    type: PiqueTreeActionTypes.SET_RISK_LEVEL,
    payload: riskLevel
})

export const setPiqueTree = (data) => ({
    type: PiqueTreeActionTypes.SET_PIQUE_TREE,
    payload: data
})

export const setOrientation = (data) => ({
    type: PiqueTreeActionTypes.SET_ORIENTATION,
    payload: data
})

export const setNeighbornodes = () => ({
    type: PiqueTreeActionTypes.SET_NEIGHBOR_NODES
})

export const removeFile = (file) => ({
    type: PiqueTreeActionTypes.REMOVE_FILE,
    payload: file
})

export const setRiskList = (file) => ({
    type: PiqueTreeActionTypes.SET_RISK_LIST,
    payload: file
})

export const setQuarters = (data) => ({
    type: PiqueTreeActionTypes.SET_QUARTERS,
    payload: data
})
