import React from 'react'
import styles from './ProfilePage.module.css'
import UserInfoBlock from './UserInfoBlock/UserInfoBlock'
import UserAvatarBlockContainer from './UserAvatarBlock/UserAvatarBlockContainer'

function ProfilePage() {

    return (

            <div className={styles.contentInner}>
                <UserAvatarBlockContainer/>
                <UserInfoBlock/>
            </div>

    )
}

export default ProfilePage
