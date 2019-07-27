import {database} from './config';
import mysql from 'mysql';

class Database {
    constructor(){
        this.connection = mysql.createConnection(database);
    }
}

export default new Database();