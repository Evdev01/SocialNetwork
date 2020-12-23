import React, {useEffect} from 'react'
import styles from "./Header.module.css";
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout, setAuthData} from '../../redux/auth-reducer'
import {AppStateTypes} from '../../redux/redux-reducers'

function Header() {

    const dispatch = useDispatch()
    
    const isAuth = useSelector((state: AppStateTypes) => state.auth.isAuth)

    const login = useSelector((state: AppStateTypes) => state.auth.login)

    useEffect(() => {
        dispatch(setAuthData())
    }, [])

    const logOutProfile = () => {
        dispatch(logout())
    }

    return (
            <div className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLogo}>
                        <NavLink to={'/profile'}>VKK</NavLink>
                    </div>
                    <div className={styles.headerLogin}>
                        {isAuth
                            ? <div>{login} - <button onClick={logOutProfile} className={styles.logOutProfile}>Log out</button></div>
                            : <NavLink to={'/login'}><div className={styles.btnLogin}>Login</div></NavLink>
                        }
                    </div>
                </div>
            </div>
    )
}

export default Header











