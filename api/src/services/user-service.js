import userRepository from '../repositories/user-repository';
import {encryption} from '../config';
import bcrypt from 'bcrypt';

class UserService {

    /**
     * @param {Object} user
     * @return A promise resolves the created user
     */
    async createUser(user) {
        const encryptedPassword = await bcrypt.hash(user.password, encryption.saltRounds);
        return await userRepository.createUser({...user, password: encryptedPassword});
    }

    getUser(){

    }

    likeUser(){

    }

    unlikeUser(){

    }
}

export default new UserService();