import React from 'react'
import styles from './BaseCss.module.css'
import userPhoto from '../images/user.jpg'


const BaseCss = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperInner}>
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

                <div className={styles.sidebar}>
                    <ul className={styles.sidebarUl}>
                        <li>Мой профиль</li>
                        <li>Сообщения</li>
                        <li>Музыка</li>
                        <li>Настройки профиля</li>
                    </ul>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentInner}>
                        <div className={styles.avatarPhoto}>
                            <div>
                                <img src={userPhoto} className={styles.avatarImg} alt='Best avatar'/>
                                <div className={styles.avatarButton}>
                                    <button>Изменить фото</button>
                                </div>
                            </div>
                        </div>
                            <div className={styles.infoAbout}>
                                <ul>
                                    <li>Статус:</li>
                                    <li>Обо мне:</li>
                                    <li>Facebook:</li>
                                    <li>Instagram:</li>
                                </ul>
                            </div>



                    </div>

                </div>
            </div>
        </div>
    )
}


export default BaseCss