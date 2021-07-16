import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./rootReducer";
import logger from 'redux-logger';

let middleware =[logger]
export const store = createStore(rootReducer, applyMiddleware(...middleware));
export default store;