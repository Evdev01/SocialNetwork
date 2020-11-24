import React from 'react'
import styles from './BasicStructure.module.css'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import Content from '../Content/Content'


const BasicStructure = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperInner}>

                <Header/>

                <Sidebar/>

                <Content/>

            </div>
        </div>
    )
}


export default BasicStructure