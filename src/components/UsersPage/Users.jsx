import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getUsers} from '../../redux/users-reducer'
import Paginator from './Paginator'
import User from './User'


function Users() {

    const dispatch = useDispatch()

    const {users, totalCount, pageSize, currentPage} = useSelector(({usersPage}) => {
        return {
            users: usersPage.users,
            totalCount: usersPage.totalCount,
            pageSize: usersPage.pageSize,
            currentPage: usersPage.currentPage
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

    const onPageChanged = (pageNumber) => {
        dispatch(getUsers(pageNumber, pageSize))
    }

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalCount={totalCount} pageSize={pageSize}/>
        <div>
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












