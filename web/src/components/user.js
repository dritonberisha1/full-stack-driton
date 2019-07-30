import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class User extends Component {

    static get propTypes() {
        return {
            user: PropTypes.object.isRequired,
            likeUser: PropTypes.func.isRequired,
            unlikeUser: PropTypes.func.isRequired,
            isLiked: PropTypes.bool
        }
    };

    likeUnlikeUser = () => {
        if(!this.props.isLiked) return this.props.likeUser(this.props.user.id);
        return this.props.unlikeUser(this.props.user.id);
    };


    render() {
        return (
            <div className="card mb-3">
                <div className="d-inline px-5 py-3">
                    <span>{this.props.user && this.props.user.username}</span>
                    <i className={`far fa-thumbs-up fa-lg float-right ${this.props.isLiked ? 'liked' : ''}`} onClick={this.likeUnlikeUser}></i>
                    <span className="mr-3 float-right">{this.props.user && this.props.user.likes}</span>
                </div>
            </div>
        )
    }
}

export default User