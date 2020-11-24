import React from 'react'
import styles from "./Header.module.css";
import {NavLink} from 'react-router-dom'

function Header() {

    return (
            <div className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLogo}>
                        <h1>VKK</h1>
                    </div>
                    <div className={styles.headerLogin}>
                        <NavLink to={'/login'}>Login</NavLink>
                    </div>
                </div>
            </div>
    )
}

export default Header
