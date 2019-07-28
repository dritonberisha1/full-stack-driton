import userRepository from '../repositories/user-repository';
import {encryption} from '../config';
import bcrypt from 'bcrypt';

class UserService {

    /**
     * @param user {Object}
     * @return A promise resolves the created user
     */
    async createUser(user) {
        const encryptedPassword = await bcrypt.hash(user.password, encryption.saltRounds);
        return await userRepository.createUser({...user, password: encryptedPassword});
    }

    /**
     * @param user {Object}
     * @return {Promise<void>}
     */
    async getUser(user){
        if(!user.id) throw Error('User id not provided');
        return await userRepository.getUser(user.id);
    }

    likeUser(){

    }

    unlikeUser(){

    }
}

export default new UserService();