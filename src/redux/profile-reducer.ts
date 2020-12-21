import {profileAPI} from '../Api/api'
import {BaseThunkType, InferActionsTypes} from './redux-reducers'
import {PhotosType, ProfileType} from '../types/types'


const defaultState = {
    profile: null as ProfileType | null,
    status: ''
}

type InitialState = typeof defaultState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

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



export const getUserProfile = (userId: number | null): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response.data))
}

export const getStatus = (userId: number | null): ThunkType => async (dispatch) => {
    const response = await profileAPI.getStatusProfile(userId)
    dispatch(actions.getStatusProfileSuccess(response.data))
}


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const response = await profileAPI.updateStatusProfile(status)
    if (response.data.resultCode === 0) {
        dispatch(actions.getStatusProfileSuccess(status))
    }
}

export const setPhotoProfile = (file: File): ThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(actions.setPhotoProfileSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
}








