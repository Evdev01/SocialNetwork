import {FormAction, stopSubmit} from 'redux-form'
import {BaseThunkType, InferActionsTypes} from './redux-reducers'
import {authAPI} from '../Api/auth-api'
import {securityAPI} from '../Api/security-api'
import {ResultCodeForCaptchaEnum, ResultCodesEnum} from '../Api/api'


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
    setCaptchaSuccess: (captchaUrl: string) => ({type: 'GET_CAPTCHA_URL', payload: {captchaUrl}} as const)
}


export const setAuthData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.me()

    if (data.resultCode === ResultCodesEnum.Success) {


        let {id, login, email} = data.data
        dispatch(actions.setAuthSuccess(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
        async (dispatch) => {

    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthData())
    } else {
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptcha())
        }

        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthSuccess(null, null, null, false))
    }
}

export const getCaptcha = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(actions.setCaptchaSuccess(captchaUrl))
}












