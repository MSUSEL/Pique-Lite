import { combineReducers } from "redux";
import headerToggleReducer from './headerToggle/headerToggle.reducer';
import PiqueTreeReducer from "./piqueTree/PiqueTree.reducer";

const rootReducer = combineReducers({
    headerToggle: headerToggleReducer,
    piqueTree: PiqueTreeReducer
})

export default rootReducer;