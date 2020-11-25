import {authAPI} from '../Api/api'
import {stopSubmit} from 'redux-form'

const SET_AUTH = 'auth/SET_AUTH'
const GET_USER_DATA = 'auth/GET_USER_DATA'


const defaultState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}


export default function authReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_AUTH :
        case GET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthSuccess = (id, email, login, isAuth) => ({type: SET_AUTH, payload: {id, email, login, isAuth}})

export const getUserDataSuccess = (email, password, rememberMe) => ({
    type: GET_USER_DATA,
    payload: {email, password, rememberMe}
})

export const setAuthData = (id, email, login) => (dispatch) => {
    authAPI.me(id, email, login)
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
                dispatch(setAuthSuccess(id, email, login, true))
            }
        })
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthData())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                dispatch(stopSubmit('login', {_error: message}))
            }
        })
}

export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthData(null, null, null, false))
                let {id, email, login} = response.data.data
                dispatch(setAuthSuccess(id, email, login, false))
            }
        })
}












