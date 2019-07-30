import {jwt as jwtConfig, encryption} from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from "../repositories/user-repository";

class AuthService {

    /**
     * @param {Object} data
     * @return A promise resolves the created user
     */
    async changePassword(user, data){
        const postData = {
            id: user.id,
            newPassword: await bcrypt.hash(data.newPassword, encryption.saltRounds)
        };
        const [dbUser] = await userRepository.getUserWithPassword(user.id);
        console.log("DATA", dbUser);
        if(!await bcrypt.compare(data.oldPassword, dbUser.password)) throw Error("Old password is incorrect");

        return await userRepository.updatePassword(postData);
    }

    /**
     * @param {Object} credentials
     * @return A promise resolves the authentication token
     */
    async login(credentials){
        if(!credentials.username) throw Error('Username is missing');
        const [user] = await userRepository.getUserByUsername(credentials.username);

        if(!user) throw Error('User not found');
        if(!await bcrypt.compare(credentials.password, user.password)) throw Error('Passwords not matching');

        const token = jwt.sign({...user}, jwtConfig.key);
        return Promise.resolve(token);
    }
}

export default new AuthService();