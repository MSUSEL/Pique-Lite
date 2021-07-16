import { toggleSidebar } from "../headerToggle.actions";
import HeaderToggleActionTypes from "../headerToggle.actionTypes";

describe('headerToggle action types test', () => {
    test('should create the toggleSidebar action', () => {
        expect(toggleSidebar().type).toEqual(HeaderToggleActionTypes.TOGGLE_SIDEBAR)
    });
});