import {BaseThunkType, InferActionsTypes} from './redux-reducers'
import {UserType} from '../types/types'
import {usersAPI} from '../Api/users-api'
import {ResultCodesEnum} from '../Api/api'


const defaultState = {
    users: [] as Array<UserType>,
    totalCount: 50,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
}

type InitialState = typeof defaultState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>


export default function usersReducer(state = defaultState, action: ActionsTypes): InitialState {
    switch (action.type) {
        case 'SET_USERS':
        case 'SET_TOTAL_USERS':
        case 'SET_CURRENT_PAGE':
        case 'TOGGLE_IS_FETCHING':

            return {
                ...state,
                ...action.payload
            }

        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state
    }
}

export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),

    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', payload: {users}} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', payload: {currentPage}} as const),
    setUserTotalCount: (totalCount: number) => ({type: 'SET_TOTAL_USERS', payload: {totalCount}} as const),
    setToggleFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', payload: {isFetching}} as const),

    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}



export const getUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {

    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setToggleFetching(true))


    let data = await usersAPI.getUsers(currentPage, pageSize)

    console.log(data)


    dispatch(actions.setUsers(data.items))
    dispatch(actions.setUserTotalCount(data.totalCount))
    dispatch(actions.setToggleFetching(false))

}


export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingInProgress(true, userId))
       const response = await usersAPI.follow(userId)
                if (response.resultCode === ResultCodesEnum.Success) {
                    dispatch(actions.followSuccess(userId))
                }
                dispatch(actions.toggleFollowingInProgress(false, userId))
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleFollowingInProgress(true, userId))
        const response = await usersAPI.unfollow(userId)
                if (response.resultCode === ResultCodesEnum.Success) {
                    dispatch(actions.unfollowSuccess(userId))
                }
                dispatch(actions.toggleFollowingInProgress(false, userId))
    }
}






