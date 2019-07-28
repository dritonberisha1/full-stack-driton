import {jwt as jwtConfig} from "../config";
import jwt from 'jsonwebtoken';

/**
 * @param headers {Object} Request headers
 * @return {*}
 */
export const verifyJwt = (request, response, next) => {
    try{
        const token = request.headers.authorization.split(" ")[1];
        request.user = jwt.verify(token, jwtConfig.key);
        next();
    }catch(error){
        console.error(error);
        return response.status(403).json({message: 'You are not authorized'});
    }

};