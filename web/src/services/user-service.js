import BaseService from './base-service';

class User extends BaseService{

    //Fetch users from most likes and descending
    fetchUsers = () => {
        return this._apiGet({
            auth: false,
            path: '/users/most-liked'
        })
    };

    //Get current logged in user
    getCurrentUser = () => {
        return this._apiGet({
            auth: true,
            path: '/users/me'
        })
    };

    //Fetch users from most likes and descending
    getUser = (userId) => {
        return this._apiGet({
            path: `/users/${userId}`
        })
    };

    likeUser = (userId) => {
        return this._apiPost({
            auth: true,
            data: {},
            path: `/users/${userId}/like`
        })
    };

    unlikeUser = (userId) => {
        return this._apiDelete({
            auth: true,
            path: `/users/${userId}/unlike`
        })
    };
}

export default new User();