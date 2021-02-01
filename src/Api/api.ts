import axios from 'axios'
import {UserType} from '../types/types'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'a1c8fa6f-45b4-4f10-a01b-116ad4e14ff5'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
















