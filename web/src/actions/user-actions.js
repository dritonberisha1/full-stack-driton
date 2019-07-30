import * as types from './action-types';
import userService from '../services/user-service';
import modes from '../shared/modes';

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch({type: types.USER_MODE ,mode: modes.FETCHING});
        return userService.fetchUsers()
            .then((results) => dispatch({type: types.USER_FETCH, users: results.data, mode: modes.WITH_RESULTS}))
            .catch(error => dispatch({type: types.USER_MODE_ERROR, mode: modes.WITH_ERROR, errorMessage: 'Could not fetch users!'}));
    }
};

export const getUser = (userId) => {
  return (dispatch) => {
      dispatch({type: types.USER_MODE ,mode: modes.FETCHING});
      return userService.getUser(userId)
          .then((result) => dispatch({type: types.SET_CURRENT_USER, user: result.data, mode: modes.BROWSE}))
          .catch(error => dispatch({type: types.USER_MODE_ERROR, mode: modes.WITH_ERROR, errorMessage: 'Could not get user!'}));

  }
};

export const likeUser = (userId) => {
    return (dispatch) => {
        dispatch({type: types.USER_MODE ,mode: modes.FETCHING});
        return userService.likeUser(userId)
            .then(() => dispatch({type: types.USER_MODE, mode: modes.BROWSE}))
            .catch(error => dispatch({type: types.USER_MODE_ERROR, mode: modes.WITH_ERROR, errorMessage: 'Could not like user!'}));

    }
};

export const unlikeUser = (userId) => {
    return (dispatch) => {
        dispatch({type: types.USER_MODE ,mode: modes.FETCHING});
        return userService.unlikeUser(userId)
            .then(() => dispatch({type: types.USER_MODE, mode: modes.BROWSE}))
            .catch(error => dispatch({type: types.USER_MODE_ERROR, mode: modes.WITH_ERROR, errorMessage: 'Could not unlike user!'}));

    }
};