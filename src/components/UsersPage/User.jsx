import React from 'react'
import styles from './UsersPage.module.css'
import {NavLink} from 'react-router-dom'
import userPhoto from '../../assets/images/user.jpg'


function User({user}) {
    return (
        <div>
                <span>
                    <div>
                       <NavLink to={'/profile/' + user.id}>
                        <img alt={'loading'} src={user.photos.small != null ? user.photos.small : userPhoto}
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"}</div>
                    </span>
                </span>
        </div>)
}
export default User












