import {jwtToken} from '../config';
import jwt from 'jsonwebtoken';
import userRepository from "../repositories/user-repository";

class AuthService {

    async changePassword(data){
        data.oldPassword = await _hashPassword(data.oldPassword);
        data.newPassword = await _hashPassword(data.newPassword);
        return await userRepository.updatePassword(data);
    }

    async login(credentials){
        const user = userRepository.getUserByUsername(credentials.username);
        if(!user) return Promise.reject();
        const token = jwt.sign({userId: user.id}, jwtToken.key);s
        return Promise.resolve(token);
    }
}

export default new AuthService();