import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AuthService from './services/auth-service';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import Navigation from './components/navigation';
import Home from './pages/home';
import Profile from './pages/profile';
import Login from './pages/login';
import SignUp from './pages/sign-up';
import {getCurrentUser} from './actions/auth-actions';

class App extends React.Component {

    state = {
        authenticated: false,
        user: null
    };

    componentDidMount() {
        this.isAuthenticated();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.isAuthenticated();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.authenticated && this.props.location.pathname === '/login' && nextProps.location.pathname === '/') {
            this.props.getCurrentUser();
        }
    }

    isAuthenticated = () => {
        AuthService.getCurrentSession()
            .then(session => {
                this.setState({
                    authenticated: session.token ? true : false
                });
                this.props.getCurrentUser();
            })
            .catch(() => {
                this.setState({
                    authenticated: false
                })
            });
    };

    render() {
        return (
            <React.Fragment>
                <Navigation auth={this.state.authenticated}/>
                <div className="container">
                    <div className="row">
                        <div className="offset-3 col-6 mt-5">
                            <div className="card p-4">
                                {!this.state.authenticated && (
                                    <Switch>
                                        <Route exact path="/" component={Home}/>
                                        <Route exact path="/login" component={Login}/>
                                        <Route exact path="/signup" component={SignUp}/>
                                        <Route render={props => (
                                            <Redirect to={{
                                                pathname: `/`,
                                                state: {from: props.location}
                                            }}/>
                                        )}/>
                                    </Switch>
                                )}
                                {this.state.authenticated && (
                                    <Switch>
                                        <Route exact path="/" component={Home}/>
                                        <Route exact path="/profile" component={Profile}/>
                                        <Route render={props => (
                                            <Redirect to={{
                                                pathname: `/`,
                                                state: {from: props.location}
                                            }}/>
                                        )}/>
                                    </Switch>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(null, {getCurrentUser})(withRouter(App));
