import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUsers} from '../../redux/users-reducer'
import Paginator from './Paginator'
import User from './User'
import Preloader from '../../common/Preloader/Preloader'
import styles from './UsersPage.module.css'
import {UserType} from '../../types/types'
import {AppStateTypes} from '../../redux/redux-reducers'


function Users() {


    const dispatch = useDispatch()

    interface StateProps {
        users: Array<UserType>
        totalCount: number
        pageSize: number
        currentPage: number
        isFetching: boolean
    }
    const {users, totalCount, pageSize, currentPage, isFetching} = useSelector<AppStateTypes, StateProps>( (state: AppStateTypes) => {
        return {
            users: state.usersPage.users,
            totalCount: state.usersPage.totalCount,
            pageSize: state.usersPage.pageSize,
            currentPage: state.usersPage.currentPage,
            isFetching: state.usersPage.isFetching
        }
    })

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize))
    }, [])

    const pagesCount = Math.ceil(totalCount / pageSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize))
    }


    return <div>
        {isFetching ? <Preloader/> : null}

        <Paginator onPageChanged={onPageChanged}
                   totalCount={totalCount} pageSize={pageSize}/>
        <div className={styles.usersBlock}>
            {
                users.map(u => <User user={u}
                                     key={u.id}
                    />
                )
            }
        </div>
    </div>
}

export default Users












