import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../actions/auth-actions";
import modes from '../shared/modes';

class Login extends React.Component {

    state = {}

    login() {

    }

    authenticate = () => {
        this.props.authenticate().then(() => this.props.history.push('/'));
    };

    render() {
        return (
            <React.Fragment>
                <h1 className="text-center">Login to Full stack assignment</h1>

                {this.props.mode === modes.WITH_ERROR && (
                    <div className="alert alert-danger">
                        <i className="fas fa-exclamation-circle pr-2"></i>
                        {this.props.errorMessage}
                    </div>
                )}
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control"
                               id="username"
                               name="username"
                               value={this.props.username}
                               onChange={this.props.onChange}
                               placeholder="Username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control"
                               id="password"
                               name="password"
                               value={this.props.password}
                               onChange={this.props.onChange}
                               placeholder="Password"/>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={this.authenticate} type="button"
                            disabled={this.props.mode === modes.FETCHING}> Log in
                    </button>
                    <span className="ml-3">You don't have an account yet? <Link to="/signup">Sign up here!</Link></span>
                </form>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({authReducer}) => {
    return {
        ...authReducer
    };
};

export default connect(mapStateToProps, actions)(Login);