import {usersAPI} from '../Api/api'


const FOLLOW = 'profile/FOLLOW'
const UNFOLLOW = 'profile/UNFOLLOW'
const SET_USERS = 'profile/SET_USERS'
const SET_TOTAL_USERS = 'profile/SET_TOTAL_USERS'
const SET_CURRENT_PAGE = 'profile/SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'profile/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'profile/TOGGLE_IS_FOLLOWING_PROGRESS'


const defaultState = {
    users: [],
    totalCount: 50,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}


export default function usersReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERS:
        case SET_TOTAL_USERS:
        case SET_CURRENT_PAGE:
        case TOGGLE_IS_FETCHING:

            return {
                ...state,
                ...action.payload
            }

        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }

        default:
            return state
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})

export const setUsers = (users) => ({type: SET_USERS, payload: {users}})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, payload: {currentPage}})
export const setUserTotalCount = (totalCount) => ({type: SET_TOTAL_USERS, payload: {totalCount}})
export const setToggleFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, payload: {isFetching}})

export const toggleFollowingInProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})


export const getUsers = (currentPage, pageSize) => async (dispatch) => {

    dispatch(setCurrentPage(currentPage))
    dispatch(setToggleFetching(true))


    let data = await usersAPI.getUsers(currentPage, pageSize)


    dispatch(setUsers(data.items))
    dispatch(setUserTotalCount(data.totalCount))
    dispatch(setToggleFetching(false))
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingInProgress(false, userId))
            })
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingInProgress(true, userId))
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleFollowingInProgress(false, userId))
            })
    }
}






