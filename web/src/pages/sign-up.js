import React from 'react';
import modes from "../shared/modes";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../actions/auth-actions";

class SignUp extends React.Component {


    signUp = () => {
        this.props.signUp().then((success) => {
            console.log("Success", success);
            if (success) {
                this.props.history.push('/');
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <h1 className="text-center">Create an account at Full stack assignment</h1>

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
                    <button className="btn btn-primary mt-3" onClick={this.signUp} type="button"
                            disabled={this.props.mode === modes.FETCHING}> Sign up
                    </button>
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

export default connect(mapStateToProps, actions)(SignUp)