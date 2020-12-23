import styles from './ProfilePageInfo.module.css'
import React, {ChangeEvent, useState} from 'react'
import userPhoto from '../../../../src/assets/images/user.jpg'
import Preloader from '../../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ProfileDataFormRedux from './ProfileDataForm'
import {useDispatch, useSelector} from 'react-redux'
import {saveProfile} from '../../../redux/profile-reducer'
import {Redirect} from 'react-router-dom'
import {ContactsType, ProfileType} from '../../../types/types'
import {AppStateTypes} from '../../../redux/redux-reducers'


type PropsType = {
    profile: ProfileType
    setPhotoProfile: (photo: File) => void
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
}

const ProfilePageInfo: React.FC<PropsType> =({profile, setPhotoProfile, isOwner, status, updateStatus}) => {


    let [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()

    const isAuth = useSelector((state: AppStateTypes) => state.auth.isAuth)


    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            setPhotoProfile(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfile(formData))
        setEditMode(false)
    }

    if (!isAuth) {
        return <Redirect to={'/profile'}/>
    }


    return (
        <div className={styles.contentInner}>
            <div className={styles.avatarPhoto}>
                <div className={styles.avatarImg}>
                    <img src={profile.photos.large || userPhoto} alt='Best avatar'/>
                </div>
                <div>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected} className={styles.inputFile}/>}

                    <ProfileStatus status={status} updateStatus={updateStatus}/>
                </div>
            </div>
            <div className={styles.infoAboutProfile}>
                {editMode
                    ? <ProfileDataFormRedux initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>
                }
            </div>
        </div>

    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    goToEditMode: () => void
    isOwner: boolean
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, goToEditMode, isOwner}) => {
    return (
        <div className={styles.profileData}>
            <div className={styles.basicInformation}>

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
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
                {isOwner && <div>
                    <button onClick={goToEditMode} className={styles.btnEditProfile}>Edit</button>
                </div>
                }
            </div>
            <div className={styles.profileContactsInformation}>
                <b><h1>Contacts :</h1></b> {Object.keys(profile.contacts).map(key => {
                return <Contacts contactsValue={key} key={key} contactsKey={profile.contacts[key as keyof ContactsType]}/>
            })}
            </div>
        </div>
    )
}

type ContactsPropsType = {
    contactsValue: string
    contactsKey: string
}

const Contacts: React.FC<ContactsPropsType> = ({contactsValue, contactsKey}) => {
    return <div className={styles.profilePageContacts}><b>{contactsValue}: </b>{contactsKey}</div>
}


export default ProfilePageInfo



















