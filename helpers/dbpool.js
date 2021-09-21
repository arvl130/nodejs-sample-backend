const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test_db',
    connectionLimit: 5
});

module.exports = pool;