import styles from './UserBlock.module.css'
import React from 'react'
import userPhoto from '../../../../src/assets/images/user.jpg'
import Preloader from '../../../common/Preloader/Preloader'

function UserAvatarBlock({profile, setPhotoProfile, isOwner}) {



    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            setPhotoProfile(e.target.files[0])
        }
    }

    return (
        <div className={styles.avatarPhoto}>
            <div className={styles.avatarImg}>
                <img src={profile.photos.large || userPhoto} alt='Best avatar' />
            </div>
            <div className={styles.avatarButton}>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/> }
            </div>
        </div>

    )
}


export default UserAvatarBlock;