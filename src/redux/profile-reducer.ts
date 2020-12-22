import {BaseThunkType, InferActionsTypes} from './redux-reducers'
import {PhotosType, ProfileType} from '../types/types'
import {profileAPI} from '../Api/profile-api'
import {ResultCodesEnum} from '../Api/api'
import {FormAction, stopSubmit} from 'redux-form'


const defaultState = {
    profile: null as ProfileType | null,
    status: ''
}

type InitialState = typeof defaultState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export default function profileReducer(state = defaultState, action: ActionsTypes): InitialState {
    switch (action.type) {
        case 'profile-reducer/SET_PHOTO_PROFILE' :
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType}
        case 'profile-reducer/SET_USER_PROFILE' :
        case 'profile-reducer/GET_USER_STATUS' :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const actions = {
    setUserProfile: (profile: ProfileType) => ({type: 'profile-reducer/SET_USER_PROFILE', payload: {profile}} as const),
    setPhotoProfileSuccess: (photos: PhotosType) => ({type: 'profile-reducer/SET_PHOTO_PROFILE', photos} as const),
    getStatusProfileSuccess: (status: string) => ({type: 'profile-reducer/GET_USER_STATUS', payload: {status}} as const)
}



export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatusProfile(userId)
    dispatch(actions.getStatusProfileSuccess(data))
}


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatusProfile(status)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.getStatusProfileSuccess(status))
    }
}

export const setPhotoProfile = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setPhotoProfileSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error('userId can\'t be null')
        }
    } else {
        dispatch(stopSubmit("profile-edit", {_error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}








