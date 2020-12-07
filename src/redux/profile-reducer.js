import {profileAPI} from '../Api/api'

const SET_PHOTO_PROFILE = 'profile-reducer/SET_PHOTO_PROFILE'
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE'
const GET_USER_STATUS = 'profile-reducer/GET_USER_STATUS'


const defaultState = {
    profile: null,
    status: ''
}


export default function profileReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_PHOTO_PROFILE :
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        case SET_USER_PROFILE :
        case GET_USER_STATUS :
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, payload: {profile}})
export const setPhotoProfileSuccess = (photos) => ({type: SET_PHOTO_PROFILE, photos})
export const getStatusProfileSuccess = (status) => ({type: GET_USER_STATUS, payload: {status}})



export const getUserProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatusProfile(userId)
    dispatch(getStatusProfileSuccess(response.data))
}


export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatusProfile(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatusProfileSuccess(status))
    }
}

export const setPhotoProfile = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0) {
        dispatch(setPhotoProfileSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    }
}








