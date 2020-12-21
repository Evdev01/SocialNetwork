import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer from "./profile-reducer";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk, {ThunkAction} from 'redux-thunk'
import authReducer from './auth-reducer'
import { reducer as formReducer } from 'redux-form'
import usersReducer from './users-reducer'
import appReducer from './app-reducer'



const rootReducer = combineReducers({
    pageSize: profileReducer,
    auth: authReducer,
    usersPage: usersReducer,
    app: appReducer,
    form: formReducer
})

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateTypes = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateTypes, unknown, A>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))