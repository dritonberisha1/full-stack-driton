import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import * as userActions from "../actions/user-actions";
import * as authActions from "../actions/auth-actions";
import User from '../components/user';
import modes from "../shared/modes";

class Home extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }

    likeUser = (userId) => {
        this.props.likeUser(userId)
            .then(() => {
                this.props.fetchUsers();
                this.props.getCurrentUser();
            })
            .catch(error => {

            })
    };

    unlikeUser = (userId) => {
        this.props.unlikeUser(userId)
            .then(() => {
                this.props.fetchUsers();
                this.props.getCurrentUser();
            })
            .catch(error => {

            })
    };

    isLiked = (userId) => {
        if (!userId || !this.props.authUser.likedUsers) return;
        return this.props.authUser.likedUsers.some(user => user.id === userId);
    };

    render() {
        return (
            <Fragment>
                <h1>Users</h1>
                {this.props.mode === modes.WITH_ERROR && (
                    <div className="alert alert-danger">
                        <i className="fas fa-exclamation-circle pr-2"></i>
                        {this.props.errorMessage}
                    </div>
                )}
                {this.props.users && this.props.users.map(user => (
                    <User user={user} likeUser={this.likeUser} unlikeUser={this.unlikeUser} key={user.id}
                          isLiked={this.isLiked(user.id)}></User>
                ))}
            </Fragment>
        );
    }
}

const mapStateToProps = ({userReducer, authReducer}) => {
    return {
        ...userReducer,
        authUser: authReducer.user
    };
};

export default connect(mapStateToProps, {...userActions, ...authActions})(Home);