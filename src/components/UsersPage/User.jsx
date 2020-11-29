import React from 'react'
import styles from './User.module.css'
import {NavLink} from 'react-router-dom'
import userPhoto from '../../assets/images/user.jpg'
import {useDispatch, useSelector} from 'react-redux'
import {follow, unfollow} from '../../redux/users-reducer'


function User({user}) {


    const dispatch = useDispatch()

    const followingInProgress = useSelector(state => state.usersPage.followingInProgress)

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
                    ? <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  dispatch(unfollow(user.id))
                              }}>Unfollow</button>
                    : <button disabled={followingInProgress.some(id => id === user.id)}
                              onClick={() => {
                                  dispatch(follow(user.id))
                              }}>Follow</button>
                }
            </div>

            <div>
                <div>
                    <div><b>Name: </b>{user.name}</div>
                    <div><b>Status: </b> {user.status || '-----'}</div>
                </div>

            </div>
        </div>)
}

export default User












