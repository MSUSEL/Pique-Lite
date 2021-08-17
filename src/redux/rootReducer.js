import { combineReducers } from "redux";
import headerToggleReducer from './headerToggle/headerToggle.reducer';
import PiqueTreeReducer from "./piqueTree/PiqueTree.reducer";
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    headerToggle: headerToggleReducer,
    piqueTree: PiqueTreeReducer,
    form: formReducer
})

export default rootReducer;