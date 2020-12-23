import React from 'react'
import styles from './ProfilePageInfo.module.css'
import {createField, GetStringKeys, Input} from '../../../common/FormsControls'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {ProfileType} from '../../../types/types'

type PropsType = {
    profile:ProfileType
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({profile, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.profileData}>
            <div className={styles.basicInformation}>

                <div className={styles.basicInformation}>
                    <div>
                        <b>Full name</b>: {createField<ProfileTypeKeys>('Full name', 'fullName', [], Input, {})}
                    </div>
                    <div>
                        <b>About me</b>:
                        {createField<ProfileTypeKeys>('About me', 'aboutMe', [], Input, {})}
                    </div>
                    <div>
                        <b>Looking for a job</b>:
                        {createField<ProfileTypeKeys>('Looking for a job', 'lookingForAJob', [], Input, {type: 'checkbox'})}
                    </div>
                    <div>
                        <b>My professional skills</b>:
                        {createField<ProfileTypeKeys>('My professional skills', 'lookingForAJobDescription', [], Input, {})}
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

const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({
    form: 'profile-edit'
})(ProfileDataForm)

export default ProfileDataFormRedux
