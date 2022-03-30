import { createSelector } from "reselect";

const piqueTree = state => state.piqueTree;

export const selectProjects = createSelector(
    [piqueTree],
    piqueTree => piqueTree.projects
)

export const selectVersions= createSelector(
    [piqueTree],
    piqueTree => piqueTree.versions
)

export const selectProjectName= createSelector(
    [piqueTree],
    piqueTree => piqueTree.projectName
)

export const selectRiskLevel= createSelector(
    [piqueTree],
    piqueTree => piqueTree.riskLevel
)

export const selectTree= createSelector(
    [piqueTree],
    pique => pique.tree
)

export const selectOrientation = createSelector(
    [piqueTree],
    piqueTree => piqueTree.orientation
)

export const selectNeighborNodes = createSelector(
    [piqueTree],
    piqueTree => piqueTree.neighborNodes
)

export const selectRiskList = createSelector(
    [piqueTree],
    piqueTree => piqueTree.riskList
)

export const selectQuarters = createSelector(
    [piqueTree],
    piqueTree => piqueTree.quarters
)

export const selectQFiles = createSelector(
    [piqueTree],
    piqueTree => piqueTree.QFiles
)