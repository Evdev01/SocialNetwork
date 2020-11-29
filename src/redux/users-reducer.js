import {usersAPI} from '../Api/api'

const SET_USERS = 'profile/SET_USERS'
const SET_TOTAL_USERS = 'profile/SET_TOTAL_USERS'
const SET_CURRENT_PAGE = 'profile/SET_CURRENT_PAGE'


const defaultState = {
    users: [],
    totalCount: 20,
    pageSize: 5,
    currentPage: 1
}


export default function usersReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USERS :
            return {
                ...state,
                users: action.users
            }
        case SET_TOTAL_USERS :
            return {
                ...state,
                totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE :
            return {
                ...state,
                currentPage: action.currentPage
            }
        default:
            return state
    }
}

export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setUserTotalCount = (totalCount) => ({type: SET_TOTAL_USERS, totalCount})



export const getUsers = (currentPage, pageSize) => async (dispatch) => {

    dispatch(setCurrentPage(currentPage))

    let data = await usersAPI.getUsers(currentPage, pageSize)

    dispatch(setUsers(data.items))
    dispatch(setUserTotalCount(data.totalCount))
}








