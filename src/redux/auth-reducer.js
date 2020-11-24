import {authAPI} from '../Api/api'

const SET_AUTH = 'SET_AUTH'


const defaultState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}


export default function authReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_AUTH :
            return {
                ...state,
                ...action.payload

            }
        default:
            return state
    }
}

export const setAuthSuccess = (id, email, login, isAuth) => ({type: SET_AUTH, payload: {id, email, login, isAuth}})

export const setAuthData = (id, email, login) => (dispatch) => {
    authAPI.me(id, email, login)
        .then(response => {
            console.log(response)
            if (response.data.resultCode === 0 ) {
                let {id, email, login} = response.data.data
                dispatch(setAuthSuccess(id, email, login, true))
            }
        })
}