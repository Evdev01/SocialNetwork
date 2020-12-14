import React from 'react'
import styles from './ProfilePageInfo.module.css'
import {createField, Input} from '../../../common/FormsControls'
import {reduxForm} from 'redux-form'

const ProfileDataForm = ({profile, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.profileData}>
            <div className={styles.basicInformation}>

                <div className={styles.basicInformation}>
                    <div>
                        <b>Full name</b>: {createField('Full name', 'fullName', [], Input, {})}
                    </div>
                    <div>
                        <b>About me</b>:
                        {createField('About me', 'aboutMe', [], Input, {})}
                    </div>
                    <div>
                        <b>Looking for a job</b>:
                        {createField('Looking for a job', 'lookingForAJob', [], Input, {type: 'checkbox'})}
                    </div>
                    <div>
                        <b>My professional skills</b>:
                        {createField('My professional skills', 'lookingForAJobDescription', [], Input, {})}
                    </div>
                    <div>
                        <button className={styles.btnEditProfile}>Save</button>
                    </div>
                </div>
            </div>
            <div className={styles.profileContactsInformation}>
                <b><h1>Contacts :</h1></b>{Object.keys(profile.contacts).map(key => {
                return <div key={key} className={styles.contact}>
                    <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b>
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataFormRedux = reduxForm({
    form: 'profile-edit'
})(ProfileDataForm)

export default ProfileDataFormRedux
