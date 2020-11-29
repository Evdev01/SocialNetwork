import React from 'react'
import styles from './UsersPage.module.css'
import Users from './Users'


function UsersPage() {

    return (
        <div className={styles.users}>
            <Users/>
        </div>
    )
}

export default UsersPage
