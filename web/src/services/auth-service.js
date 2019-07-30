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

    signUp = (data) => {
        return this._apiPost({
            auth: false,
            data: data,
            path: '/signup',
        })
    };

    getCurrentSession = () => {
        return new Promise((resolve, reject) => {
            const session = localStorage.getItem('session');
            if(session) resolve(JSON.parse(session));
            reject();
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
    }
}

export default new AuthService();