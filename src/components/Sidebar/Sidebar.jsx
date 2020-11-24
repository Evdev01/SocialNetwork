import React from 'react'
import styles from "./Sidebar.module.css";

function Sidebar() {

    return (
        <div className={styles.sidebar}>
            <ul className={styles.sidebarUl}>
                <li>Мой профиль</li>
                <li>Сообщения</li>
                <li>Музыка</li>
                <li>Настройки профиля</li>
            </ul>
        </div>
    )
}

export default Sidebar
