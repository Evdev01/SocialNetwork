import styles from './UserBlock.module.css'
import React from 'react'
import userPhoto from '../../images/user.jpg'

function UserAvatarBlock() {

    return (
        <div className={styles.avatarPhoto}>
            <img src={userPhoto} className={styles.avatarImg} alt='Best avatar'/>
            <div className={styles.avatarButton}>
                <button>Изменить фото</button>
            </div>
        </div>

    )
}

export default UserAvatarBlock