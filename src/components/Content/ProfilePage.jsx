import React from 'react'
import styles from './ProfilePage.module.css'
import UserAvatarBlock from './UserAvatarBlock/UserAvatarBlock'
import UserInfoBlock from './UserInfoBlock/UserInfoBlock'

function ProfilePage() {

    return (

            <div className={styles.contentInner}>
                <UserAvatarBlock/>
                <UserInfoBlock/>
            </div>

    )
}

export default ProfilePage
