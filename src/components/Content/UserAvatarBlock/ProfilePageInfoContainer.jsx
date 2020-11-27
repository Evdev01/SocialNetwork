import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'redux'
import {getStatus, getUserProfile, saveProfile, setPhotoProfile, updateStatus} from '../../../redux/profile-reducer'
import ProfilePageInfo from './ProfilePageInfo'

class ProfilePageInfoContainer extends React.Component {


    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId);
    }

    componentDidMount() {

        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <ProfilePageInfo {...this.props}
                             isOwner={!this.props.match.params.userId}
                             profile={this.props.profile}
                             getStatus={this.props.getStatus}
                             updateStatus={this.props.updateStatus}
                             status={this.props.status}
                             saveProfile={this.props.saveProfile}
                             setPhotoProfile={this.props.setPhotoProfile}/>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
        profile: state.pageSize.profile,
        status: state.pageSize.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth
    })
}

export default compose(
    connect(mapStateToProps, {getUserProfile, setPhotoProfile, getStatus, updateStatus, saveProfile}),
    withRouter
)(ProfilePageInfoContainer)




