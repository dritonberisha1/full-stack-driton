import BaseService from './base-service';

class AuthService extends BaseService{

    authenticate = async (data) => {
        const token = await this._apiPost({
            auth: false,
            data: data,
            path: '/login',
        });
        this.setCurrentSession({token: token.data});
        return Promise.resolve();
    };

    changePassword = (data) => {
        return this._apiPost({
            auth: true,
            data: data,
            path: '/users/me/update-password',
        })
    };

    getCurrentSession = () => {
        return new Promise((resolve, reject) => {
            const session = localStorage.getItem('session');
            if(session) resolve(JSON.parse(session));
            reject({code:403, message:"User is not logged in"});
        });
    };

    setCurrentSession = (session) => {
        localStorage.setItem('session', JSON.stringify(session));
    };

    signOut = () => {
        return new Promise((resolve, reject) => {
            localStorage.removeItem('session');
            resolve();
        });
    };

    signUp = (data) => {
        return this._apiPost({
            auth: false,
            data: data,
            path: '/signup',
        })
    };

}

export default new AuthService();