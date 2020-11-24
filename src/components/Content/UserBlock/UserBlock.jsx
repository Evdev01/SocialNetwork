import styles from './UserBlock.module.css'
import React from 'react'
import UserAvatarBlock from '../UserAvatarBlock/UserAvatarBlock'
import UserInfoBlock from '../UserInfoBlock/UserInfoBlock'

function UserBlock() {

    return (
        <div className={styles.contentInner}>
            <UserAvatarBlock/>
            <UserInfoBlock/>
        </div>
    )
}

export default UserBlock