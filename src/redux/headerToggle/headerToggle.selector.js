import { createSelector } from "reselect";

const selectHeader = state => state.headerToggle;

export const selectHeaderToggle = createSelector(
    [selectHeader],
    headerToggle => headerToggle.toggle
)