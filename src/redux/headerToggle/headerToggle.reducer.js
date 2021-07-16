import HeaderToggleActionTypes from "./headerToggle.actionTypes";

const INITIAL_STATE = {
    toggle: true
}

const HeaderToggleReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case HeaderToggleActionTypes.TOGGLE_SIDEBAR:
            return {
                ...state,
                toggle: !state.toggle
            }
        default:
            return state;
    }
}

export default HeaderToggleReducer