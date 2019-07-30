import {jwt as jwtConfig, encryption} from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from "../repositories/user-repository";

class AuthService {

    /**
     * @param {Object} data
     * @return A promise resolves the created user
     */
    async changePassword(data){
        const passwords = {
            oldPassword: await bcrypt.hash(data.oldPassword, encryption.saltRounds),
            newPassword: await bcrypt.hash(data.newPassword, encryption.saltRounds)
        };
        return await userRepository.updatePassword(passwords);
    }

    /**
     * @param {Object} credentials
     * @return A promise resolves the authentication token
     */
    async login(credentials){
        if(!credentials.username) throw Error('Username is missing');
        const [user] = await userRepository.getUserByUsername(credentials.username);

        if(!user) throw Error('User not found');
        if(!_matchPasswords(user.password, credentials.password)) throw Error('Passwords not matching');

        const token = jwt.sign({...user}, jwtConfig.key);
        return Promise.resolve(token);
    }
}

const _matchPasswords = async (userPassword, inputPassword) => {
    return userPassword === await bcrypt.hash(inputPassword, encryption.saltRounds);
};

export default new AuthService();