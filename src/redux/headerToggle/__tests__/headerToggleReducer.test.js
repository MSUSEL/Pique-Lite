import HeaderToggleReducer from "../headerToggle.reducer";
import HeaderToggleActionTypes from '../headerToggle.actionTypes'

const initialState = {
    toggle: true
}

test('should return the initial state', () => {
    expect(HeaderToggleReducer(undefined, {})).toEqual(
        {
            toggle: true
        }
    )
})

test('should show sideNav with toggleSidebar action', () => {
        expect(
            HeaderToggleReducer(initialState, {type: HeaderToggleActionTypes.TOGGLE_SIDEBAR}).toggle
        ).toBe(false)
})
