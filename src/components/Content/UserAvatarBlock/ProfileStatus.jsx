import React, {useState} from 'react'
import styles from './ProfileStatus.module.css'


function ProfileStatus(props) {


    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activatedEditMode = () => {
        setEditMode(true)
    }

    const deactivatedEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onChangeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={styles.profileStatus}>
            {!editMode &&
            <div>
                <b>Status :</b> <span onClick={activatedEditMode}>{props.status || '-----'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onBlur={deactivatedEditMode} autoFocus={true} onChange={onChangeStatus} value={status}/>
            </div>
            }
        </div>
    )
}

export default ProfileStatus