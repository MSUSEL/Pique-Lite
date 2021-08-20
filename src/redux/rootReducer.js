import { combineReducers } from "redux";
import headerToggleReducer from './headerToggle/headerToggle.reducer';
import PiqueTreeReducer from "./piqueTree/PiqueTree.reducer";
import { reducer as formReducer } from 'redux-form';
import projectInfoReducer from './projectInfo/ProjectInfo.redux';

const rootReducer = combineReducers({
    headerToggle: headerToggleReducer,
    piqueTree: PiqueTreeReducer,
    form: formReducer,
    projectInfo: projectInfoReducer
})

export default rootReducer;