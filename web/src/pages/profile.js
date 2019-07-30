import React, {Component, Fragment} from 'react';
import modes from "../shared/modes";
import {connect} from "react-redux";
import * as actions from "../actions/auth-actions";
import authService from '../services/auth-service';

class Profile extends Component {

    signOut = () => {
        authService.signOut().then(() => this.props.history.push('/'));
    };

    changePassword = () => {
        this.props.changePassword();
    };

    render(){
        return(
            <Fragment>
                <h1>Profile</h1>
                <button className="btn btn-primary" onClick={this.signOut}>Sign Out</button>
                <hr/>
                <h2>Change password</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input type="password" className="form-control"
                               id="oldPassword"
                               name="oldPassword"
                               value={this.props.oldPassword}
                               onChange={this.props.onChange}
                               placeholder="Old Password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" className="form-control"
                               id="newPassword"
                               name="newPassword"
                               value={this.props.newPassword}
                               onChange={this.props.onChange}
                               placeholder="New Password"/>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={this.changePassword} type="button"
                            disabled={this.props.mode === modes.FETCHING}> Change password
                    </button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = ({authReducer}) => {
    return {
        ...authReducer
    };
};

export default connect(mapStateToProps, actions)(Profile);