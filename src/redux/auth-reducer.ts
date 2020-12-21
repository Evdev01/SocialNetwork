import {authAPI, securityAPI} from '../Api/api'
import {FormAction, stopSubmit} from 'redux-form'
import {BaseThunkType, InferActionsTypes} from './redux-reducers'


type InitialState = typeof defaultState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

const defaultState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}


export default function authReducer(state = defaultState, action: ActionsTypes): InitialState {
    switch (action.type) {
        case 'SET_AUTH' :
        case 'GET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const actions = {
    setAuthSuccess: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({type: 'SET_AUTH', payload: {id, email, login, isAuth}}as const),
    setCaptchaSuccess: (captchaUrl: string | null) => ({type: 'GET_CAPTCHA_URL', payload: {captchaUrl}} as const)
}


export const setAuthData = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me()

    if (response.data.resultCode === 0) {


        let {id, login, email} = response.data.data
        dispatch(actions.setAuthSuccess(id, email, login, true))
    }
}

export const login = (email: string | null, password: string | null, rememberMe: boolean, captcha: string | null): ThunkType =>
        async (dispatch) => {

    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(setAuthData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptcha())
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthSuccess(null, null, null, false))
        let {id, email, login} = response.data.data
        dispatch(actions.setAuthSuccess(id, email, login, false))
    }
}

export const getCaptcha = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(actions.setCaptchaSuccess(captchaUrl))
}












