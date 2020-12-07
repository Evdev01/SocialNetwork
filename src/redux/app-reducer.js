import {setAuthData} from './auth-reducer'

const INITIALIZED_SUCCESS = 'app-reducer/INITIALIZED_SUCCESS'


const defaultState = {
    initialized: false
}


export default function appReducer(state = defaultState, action) {
    switch (action.type) {
        case INITIALIZED_SUCCESS :
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = (initialized) => ({type: INITIALIZED_SUCCESS, initialized})



export const initializedApp = () => async (dispatch) => {
    let promise = dispatch(setAuthData())

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}





