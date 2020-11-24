import React from 'react'
import styles from "./Header.module.css";

function Header() {

    return (
            <div className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLogo}>
                        <h1>VK version 1000</h1>
                    </div>
                    <div className={styles.headerLogin}>
                        <h1>Войти</h1>
                    </div>
                </div>
            </div>
    )
}

export default Header
