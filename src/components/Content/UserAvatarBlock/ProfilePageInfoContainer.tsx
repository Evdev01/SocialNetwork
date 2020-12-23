import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {getStatus, getUserProfile, saveProfile, setPhotoProfile, updateStatus} from '../../../redux/profile-reducer'
import ProfilePageInfo from './ProfilePageInfo'
import {AppStateTypes} from '../../../redux/redux-reducers'
import {ProfileType} from '../../../types/types'

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    setPhotoProfile: (file: File) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    profile: PropsType
    status: (status: string) => void
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfilePageInfoContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        if (!userId) {
            console.error('ID should exists in URI params or in state (\'authorizedUserId\')')
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)

        }
    }

    componentDidMount() {

        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <ProfilePageInfo {...this.props}
                             isOwner={!this.props.match.params.userId}
                             profile={this.props.profile}
                             updateStatus={this.props.updateStatus}
                             status={this.props.status}
                             setPhotoProfile={this.props.setPhotoProfile}/>
        )
    }
}

let mapStateToProps = (state: AppStateTypes) => {
    return ({
        profile: state.pageSize.profile,
        status: state.pageSize.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, setPhotoProfile, getStatus, updateStatus, saveProfile}),
    withRouter
)(ProfilePageInfoContainer)




