import styles from './UserInfoBlock.module.css'
import React from 'react'

function UserInfoBlock() {

    return (
        <div className={styles.userInfoBlock}>
            <ul>
                <li>Обо мне:</li>
                <li>Facebook:</li>
                <li>Instagram:</li>
            </ul>
        </div>

    )
}

export default UserInfoBlock