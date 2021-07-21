import { createSelector } from "reselect";

const piqueTree = state => state.piqueTree;

export const selectProjects = createSelector(
    [piqueTree],
    piqueTree => piqueTree.projects
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