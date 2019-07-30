import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from "react-redux";

class Navigation extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">Full stack assignment</Link>

                    <ul className="navbar-nav float-left">
                        <li className="nav-item active">
                            <Link className="nav-link active" to="/">Home </Link>
                        </li>
                    </ul>
                    {this.props.auth && (<Link to="/profile">{this.props.user.username}</Link>)}
                    {!this.props.auth && (<Link to="/login">Login</Link>)}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({authReducer}) => {
    return {
        user: authReducer.user
    };
};

export default connect(mapStateToProps, null)(Navigation);