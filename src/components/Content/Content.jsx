import React from 'react'
import styles from './Content.module.css'
import UserBlock from './UserBlock/UserBlock'

function Content() {

    return (
        <div className={styles.content}>

            <UserBlock/>

        </div>
    )
}

export default Content
