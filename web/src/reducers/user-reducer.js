import * as types from '../actions/action-types';

const initialState = {
    errorMessage: '',
    mode: null,
    user: {
        username: '',
        likes: 0
    },
    users: []
};

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_CURRENT_USER:
            return {
                ...state,
                user: action.user
            };
        case types.USER_FETCH:
            return {
                ...state,
                users: action.users
            };
        case types.USER_MODE:
            return {
                ...state,
                mode: action.mode
            };
        case types.USER_MODE_ERROR:
            return {
                ...state,
                mode: action.mode,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
};