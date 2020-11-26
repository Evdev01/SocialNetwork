import React from 'react'
import styles from './BasicStructure.module.css'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import {Route, Switch} from 'react-router-dom'
import ProfilePage from '../Content/ProfilePage'
import Login from '../Login/Login'
import DialogsPage from '../DialogsPage/DialogsPage'
import UsersPage from '../UsersPage/UsersPage'
import SettingsPage from '../SettingsPage/SettingsPage'


const BasicStructure = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperInner}>

                <Header/>

                <Sidebar/>

                <div className={styles.content}>
                    <Switch>
                        <Route path='/profile/:userId?'
                               render={() => <ProfilePage/>}/>

                        <Route path='/dialogs'
                               render={() => <DialogsPage/>}/>

                        <Route path='/users'
                               render={() => <UsersPage/>}/>

                        <Route path='/settings'
                               render={() => <SettingsPage/>}/>

                        <Route path='/login'
                               render={() => <Login/>}/>

                    </Switch>

                </div>

            </div>
        </div>
    )
}


export default BasicStructure