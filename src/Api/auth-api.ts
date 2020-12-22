import {APIResponseType, instance, ResultCodeForCaptchaEnum, ResultCodesEnum} from './api'

type MeResponseDataType = {
    id: number
    login: string
    email: string
}

type LoginResponseType = {
    userId: number
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
            .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<APIResponseType<ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`)
    }
}