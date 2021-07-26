import { combineReducers } from "redux";
import headerToggleReducer from './headerToggle/headerToggle.reducer';
import PiqueTreeReducer from "./piqueTree/PiqueTree.reducer";
import FileListReducer from "./fileList/FileList.reducer";

const rootReducer = combineReducers({
    headerToggle: headerToggleReducer,
    piqueTree: PiqueTreeReducer,
    fileList: FileListReducer
})

export default rootReducer;