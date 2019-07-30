import * as types from '../actions/action-types';

const initialState = {
    errorMessage: '',
    mode: null,
    username: '',
    password: '',
    user: {
        username: ''
    }
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.AUTH_ON_CHANGE:
            return {
                ...state,
                [action.name]: action.value
            };
        case types.AUTH_MODE:
            return {
                ...state,
                mode: action.mode
            };
        case types.AUTH_USER_DATA:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};