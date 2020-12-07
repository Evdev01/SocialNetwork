import {authAPI, securityAPI} from '../Api/api'
import {stopSubmit} from 'redux-form'

const SET_AUTH = 'auth-reducer/SET_AUTH'
const GET_USER_DATA = 'auth-reducer/GET_USER_DATA'
const GET_CAPTCHA_URL = 'auth-reducer/GET_CAPTCHA_URL'


const defaultState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}


export default function authReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_AUTH :
        case GET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAuthSuccess = (id, email, login, isAuth) => ({type: SET_AUTH, payload: {id, email, login, isAuth}})
export const setCaptchaSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}})


export const setAuthData = () => async (dispatch) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {


        let {id, login, email} = response.data.data
        dispatch(setAuthSuccess(id, email, login, true))
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(setAuthData())
    } else {
        if (response.data.resultCode == 10) {
            dispatch(getCaptcha())
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthData(null, null, null, false))
        let {id, email, login} = response.data.data
        dispatch(setAuthSuccess(id, email, login, false))
    }
}

export const getCaptcha = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaSuccess(captchaUrl))
}












