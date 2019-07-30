import userRepository from '../repositories/user-repository';
import {encryption} from '../config';
import bcrypt from 'bcrypt';

class UserService {

    /**
     * @param user {Object}
     * @return A promise resolves the created user
     */
    async createUser(user) {
        if(!user) throw Error("User should be provided");
        if(!user.password) throw Error("User should have password");

        const encryptedPassword = await bcrypt.hash(user.password, encryption.saltRounds);
        console.log("ENCRYP", encryptedPassword);
        return await userRepository.createUser({...user, password: encryptedPassword});
    }

    /**
     * Fetches all the users ordered from most liked
     * @return A promise resolves an array of users
     */
    async fetchUsers(){
        return await userRepository.fetchUsers();
    }

    /**
     * Get authenticated user
     * @param user {Object}
     * @return A promise resolves user
     */
    async getUser(user){
        if(!user.id) throw Error('User id not provided');
        const results = await userRepository.getUser(user.id);
        if(!results[0]) throw Error('User not found');
        const authUser = {
            ...results[0][0],
            likedUsers: results.slice(1,results.length)[0]
        };
        return authUser;
    }

    /**
     * @param user
     * @return A promise resolves user with likes
     */
    async getFullUser(user){
        if(!user.id) throw Error('User id not provided');
        return await userRepository.getFullUser(user.id);
    }

    /**
     * Registers a like from the authenticated user to a selected user
     * @param authUser {number}
     * @param likedUser {number}
     */
    async likeUser(authUser, likedUser){
        if(!authUser.id || !likedUser) throw Error('User id is missing');
        return await userRepository.likeUser(authUser.id, likedUser);
    }

    /**
     * Removes a like from the authenticated user to a selected user
     * @param authUser {number}
     * @param unlikedUser {number}
     */
    async unlikeUser(authUser, unlikedUser){
        if(!authUser.id || !unlikedUser) throw Error('User id is missing');
        return await userRepository.unlikeUser(authUser.id, unlikedUser);
    }
}

export default new UserService();