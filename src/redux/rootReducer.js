import { combineReducers } from "redux";
import headerToggleReducer from './headerToggle/headerToggle.reducer';

const rootReducer = combineReducers({
    headerToggle: headerToggleReducer
})

export default rootReducer;