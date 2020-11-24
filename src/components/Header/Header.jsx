import React, {useEffect} from 'react'
import styles from "./Header.module.css";
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setAuthData} from '../../redux/auth-reducer'

function Header() {

    const dispatch = useDispatch()
    
    const isAuth = useSelector(state => state.auth.isAuth)

    const login = useSelector(state => state.auth.login)

    useEffect(() => {
        dispatch(setAuthData())
    }, [])

    return (
            <div className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLogo}>
                        <h1>VKK</h1>
                    </div>
                    <div className={styles.headerLogin}>
                        {isAuth
                            ? <div>{login}</div>
                            : <NavLink to={'/login'}>Login</NavLink>
                        }
                    </div>
                </div>
            </div>
    )
}

export default Header











