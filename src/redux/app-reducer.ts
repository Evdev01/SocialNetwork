import {setAuthData} from './auth-reducer'
import {InferActionsTypes} from './redux-reducers'


const defaultState = {
    initialized: false
}

type InitialState = typeof defaultState;
type ActionsTypes = InferActionsTypes<typeof actions>


export default function appReducer(state = defaultState, action: ActionsTypes): InitialState {
    switch (action.type) {
        case 'app-reducer/INITIALIZED_SUCCESS' :
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}


export const actions = {
    initializedSuccess: () => ({type: 'app-reducer/INITIALIZED_SUCCESS'} as const)
}


export const initializedApp = () => async (dispatch: any) => {
    let promise = dispatch(setAuthData())

    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        })
}





