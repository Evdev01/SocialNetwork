import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    pageSize: profileReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))