import {jwt as jwtConfig} from "./config";
import jwt from 'jsonwebtoken';

const unprotectedUrls = [
    '/login',
    '/signup',
    '/users/:userId',
    '/users/most-liked'
];

class Auth {
    /**
     * @param headers {Object} Request headers
     * @return {*}
     */
    verifyJwt(request) {
        console.log("VERIFY");
        const token = request.headers.authorization.split(" ")[1];
        return new Promise((resolve, reject) => {
            jwt.verify(token, jwtConfig.key, function(err, decoded) {
                if(err) reject(err);
                resolve(decoded);
            })
        });
    }

    /**
     * @param currUrl {string} Current Url
     * @return {boolean}
     */
    isUnprotectedUrl(currUrl){
        //If URL is in the unprotected array of strings
        if(unprotectedUrls.includes(currUrl)) return true;

        //If URL has params
        const urlsWithParams = unprotectedUrls.filter(url => {
            return url.includes('/:');
        });

        const isUnprotected = urlsWithParams.some(url => {
            const sub = url.split('/');
            const currSub = currUrl.split('/');
            if(sub.length !== currSub.length) return false;

            let isEqual = true;
            for(let i = 0; i < sub.length; i++){
                if(!sub[i].startsWith(':')){
                    if(sub[i] !== currSub[i]) isEqual = false;
                }
            }
            return isEqual;
        });
        return isUnprotected;
    }
}

export default new Auth();