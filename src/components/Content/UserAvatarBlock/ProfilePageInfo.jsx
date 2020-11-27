import styles from './ProfilePageInfo.module.css'
import React, {useState} from 'react'
import userPhoto from '../../../../src/assets/images/user.jpg'
import Preloader from '../../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ProfileDataFormRedux from './ProfileDataForm'
import {useDispatch} from 'react-redux'
import {saveProfile} from '../../../redux/profile-reducer'

function ProfilePageInfo({profile, setPhotoProfile, isOwner, status, updateStatus}) {


    let [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()


    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            setPhotoProfile(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        dispatch(saveProfile(formData))
        setEditMode(false)
    }


    return (
        <div className={styles.contentInner}>
            <div className={styles.avatarPhoto}>
                <div className={styles.avatarImg}>
                    <img src={profile.photos.large || userPhoto} alt='Best avatar'/>
                </div>
                <div className={styles.avatarButton}>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

                    <ProfileStatus status={status} updateStatus={updateStatus}/>
                </div>
            </div>
            <div className={styles.infoAboutProfile}>
                {editMode
                    ? <ProfileDataFormRedux initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>
                }
            </div>
        </div>

    )
}

const ProfileData = ({profile, goToEditMode, isOwner}) => {
    return (
        <div className={styles.profileData}>
            {isOwner && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>
            }
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>My professionl skilss</b>: {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>Contatcs</b> {Object.keys(profile.contacts).map(key => {
                    return <Contacts contactsValue={key} key={key} contactsKey={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}

const Contacts = ({contactsValue, contactsKey}) => {
    return <div className={styles.profilePageContacts}><b>{contactsValue}:</b>{contactsKey}</div>
}


export default ProfilePageInfo



















