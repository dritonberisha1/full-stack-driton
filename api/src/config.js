const dotenv = require('dotenv');
//Read .env file
dotenv.config();

export const database = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'full-stack',
    password: process.env.DB_PASSWORD || 'full-stack',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'full-stack',
    multipleStatements: true
};

export const encryption = {
    saltRounds: 10
};

export const jwtToken = {
    expiresIn: '12h',
    algorithm: 'RS256',
    key: process.env.JWT_KEY || 'hash_key'
};

export const server = {
    port: process.env.PORT || 3001,
    hostname: process.env.HOST || '127.0.0.1'
};