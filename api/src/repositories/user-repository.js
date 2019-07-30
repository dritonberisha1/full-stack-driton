import db from '../database';

const userTableName = 'users';
const likeTableName = 'likes';
class UserRepository {

    /**
     * @param user
     * @return A promise resolved the query result
     */
    async createUser(user){
        const sql = `INSERT INTO ?? 
        (username, password, created_at, updated_at, deleted_at) 
        VALUES (?, ?, NOW(), NOW(), NULL)`;
        const params = [userTableName, user.username, user.password];
        const results = await _query(sql, params);
        return {...user, id: results.insertId, password: undefined};
    }

    fetchUsers(){
        const sql = `SELECT id, username, created_at, updated_at, 
        (SELECT COUNT(id) FROM ?? WHERE liked_user_id = ??.id) as likes FROM ?? 
        ORDER BY likes DESC`;
        const params = [likeTableName, userTableName, userTableName];

        return _query(sql, params);
    }

    /**
     * This query tries to find the user by matching his username
     *
     * @param {string} userId
     * @return A promise resolved the query result
     */
    getUser(userId){
        const sql = `SELECT id, username, created_at, updated_at FROM ?? WHERE users.id = ?; 
        SELECT id, username, created_at, updated_at FROM ?? WHERE id IN (SELECT liked_user_id FROM ?? WHERE liked_by_user_id = ?);`;
        const params = [userTableName, userId, userTableName, likeTableName, userId];
        return _query(sql, params);
    }

    getFullUser(userId){
        const sql = `SELECT id, username, created_at, updated_at, (SELECT COUNT(id) FROM ?? WHERE liked_user_id = ??.id) as likes FROM ?? WHERE id = ?`;
        const params = [likeTableName,userTableName, userTableName, userId];

        return _query(sql, params);
    }

    /**
     * This query tries to find the user by matching his username
     *
     * @param username
     * @return A promise resolved the query result
     */
    getUserByUsername(username){
        const sql = `SELECT id, username, password, created_at, updated_at FROM ?? WHERE username = ?`;
        const params = [userTableName, username];

        return _query(sql, params);
    }

    likeUser(authUserId, userId) {
        const sql = `INSERT INTO ?? 
        (liked_user_id, liked_by_user_id) 
        VALUES (?, ?)`;
        const params = [likeTableName, userId, authUserId];
        return _query(sql, params);
    }

    unlikeUser(authUserId, userId){
        const sql = `DELETE FROM ?? WHERE liked_user_id = ? AND liked_by_user_id = ?`;
        const params = [likeTableName, userId, authUserId];
        return _query(sql, params);
    }

    /**
     * @param data
     * @return A promise resolved the query result
     */
    updatePassword(data){
        const sql = `UPDATE ?? 
            SET password = ?
            WHERE id = ? AND password = ?`;
        const params = [userTableName, data.newPassword, data.id, data.oldPassword];

        return _query(sql, params);
    }
}

const _query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.connection.query(sql, params, (error, data) => {
            if (error) {
                console.error("I FAILED", error);
                return reject(error);
            }
            resolve(data);
        });
    });
};

export default new UserRepository();