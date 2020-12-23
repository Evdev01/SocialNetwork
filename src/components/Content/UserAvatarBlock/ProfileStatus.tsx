import React, {useEffect, useState} from 'react'
import styles from './ProfileStatus.module.css'

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}


const ProfileStatus: React.FC<PropsType> = (props) => {


    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activatedEditMode = () => {
        setEditMode(true)
    }

    const deactivatedEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onChangeStatus = (e: React.FormEvent<HTMLInputElement>) => {
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