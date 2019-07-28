import db from '../database';

const userTableName = 'users';
class UserRepository {

    /**
     * @param user
     * @return A promise resolved the query result
     */
    createUser(user){
        const sql = `INSERT INTO ?? 
        (username, password, created_at, updated_at, deleted_at) 
        VALUES (?, ?, NOW(), NOW(), NULL)`;
        const params = [userTableName, user.username, user.password];

        return _query(sql, params);
    }

    /**
     * This query tries to find the user by matching his username
     *
     * @param {string} userId
     * @return A promise resolved the query result
     */
    getUser(userId){
        const sql = `SELECT username, created_at, updated_at FROM ?? WHERE username = ?`;
        const params = [userTableName, username];

        return _query(sql, params);
    }

    /**
     * This query tries to find the user by matching his username
     *
     * @param username
     * @return A promise resolved the query result
     */
    getUserByUsername(username){
        const sql = `SELECT username, password, created_at, updated_at FROM ?? WHERE username = ?`;
        const params = [userTableName, username];

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