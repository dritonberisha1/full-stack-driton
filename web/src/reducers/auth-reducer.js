import * as types from '../actions/action-types';

const initialState = {
    errorMessage: '',
    mode: null,
    username: '',
    password: '',
    user: {
        username: ''
    },
    newPassword: '',
    oldPassword: ''
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.RESET_PASSWORDS:
            return{
                ...state,
                newPassword: '',
                oldPassword: ''
            };
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
        case types.AUTH_MODE_ERROR:
            return {
                ...state,
                mode: action.mode,
                errorMessage: action.errorMessage
            };
        case types.AUTH_USER_DATA:
            return {
                ...state,
                user: action.user,
                mode: action.mode
            };
        default:
            return state;
    }
};