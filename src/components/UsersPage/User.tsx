import React from 'react'
import styles from './User.module.css'
import {NavLink} from 'react-router-dom'
import userPhoto from '../../assets/images/user.jpg'
import {useDispatch, useSelector} from 'react-redux'
import {follow, unfollow} from '../../redux/users-reducer'
import {AppStateTypes} from '../../redux/redux-reducers'
import {UserType} from '../../types/types'


type PropsType = {
    user: UserType
}

const User: React.FC<PropsType> = ({user}) => {


    const dispatch = useDispatch()

    const followingInProgress = useSelector((state: AppStateTypes) => state.usersPage.followingInProgress)

    return (
        <div className={styles.userAvatarInfo}>
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img alt={'loading'} src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                    </NavLink>
                </div>
            </div>

            <div>
                {user.followed
                    ? <button className={styles.userUnfollow} disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  dispatch(unfollow(user.id))
                              }}>Unfollow</button>
                    : <button className={styles.userFollow} disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  dispatch(follow(user.id))
                              }}>Follow</button>
                }
            </div>

            <div>
                <div className={styles.userName}>
                    <div><b>Name: </b>{user.name}</div>
                    <div><b>Status: </b> {user.status || '-----'}</div>
                </div>

            </div>
        </div>)
}

export default User












