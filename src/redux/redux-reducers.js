import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import authReducer from './auth-reducer'
import { reducer as formReducer } from 'redux-form'



const rootReducer = combineReducers({
    pageSize: profileReducer,
    auth: authReducer,
    form: formReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))