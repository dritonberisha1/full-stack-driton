import * as types from './action-types';
import authService from '../services/auth-service';
import modes from '../shared/modes';
import userService from "../services/user-service";

export const authenticate = () => {
    return (dispatch, getState) => {
        const { password, username } = getState().authReducer;

        dispatch({ type: types.AUTH_MODE, mode: modes.FETCHING });
        return authService.authenticate({ username, password })
            .then((results) => dispatch({type: types.AUTH_MODE, mode: modes.BROWSE}))
            .catch(error => dispatch({type: types.AUTH_MODE_ERROR, mode: modes.WITH_ERROR, errorMessage: ''}));
    };
};

export const onChange = (event) => {
    return {
        type: types.AUTH_ON_CHANGE,
        name: event.target.name,
        value: event.target.value.trim()
    };
};

export const signUp = () => {
    return (dispatch, getState) => {
        const { username, password } = getState().authReducer;

        dispatch({ type: types.AUTH_MODE, mode: modes.FETCHING });
        return authService.signUp({ username, password })
            .then((res) => dispatch({type: types.AUTH_MODE, mode: modes.BROWSE}))
            .catch(error => dispatch({type: types.AUTH_MODE_ERROR, mode: modes.WITH_ERROR, errorMessage: ''}));
    };
};

export const getCurrentUser = () => {
    return (dispatch) => {
        dispatch({type: types.USER_MODE ,mode: modes.FETCHING});
        return userService.getCurrentUser()
            .then((results) => dispatch({type: types.AUTH_USER_DATA, user: results.data, mode: modes.BROWSE}))
            .catch(error => console.error("error"));
    }
};