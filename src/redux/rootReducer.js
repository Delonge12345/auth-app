import {applyMiddleware, combineReducers, createStore} from "redux";

import thunkMiddleware from "redux-thunk"
import errorsReducer from "./errorsReducer";


let rootReducer = combineReducers({
   errorsPage: errorsReducer
})


let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;