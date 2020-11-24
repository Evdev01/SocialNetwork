import React from 'react'
import styles from './Sidebar.module.css'
import {NavLink} from 'react-router-dom'

function Sidebar() {

    return (
        <nav className={styles.sidebar}>
            <div className={styles.sidebarList}>
                <div className={styles.sidebarItem}>
                   <NavLink to={'/profile'} activeClassName={styles.activeLink}>Profile</NavLink>
                </div>

                <div className={styles.sidebarItem}>
                    <NavLink to={'/dialogs'} activeClassName={styles.activeLink}>Messages</NavLink>
                </div>

                <div className={styles.sidebarItem}>
                    <NavLink to={'/users'} activeClassName={styles.activeLink}>Users</NavLink>
                </div>
                <div className={styles.sidebarItem}>
                    <NavLink to={'/settings'} activeClassName={styles.activeLink}>Settings</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar
