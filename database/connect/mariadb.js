const mariadb = require('mysql');

const conn = mariadb.createConnection(
    {
        // mariadb가 있는 localhost
        host: 'localhost',
        pot: 3306,
        user: 'root',
        password: 'root',
        database: 'Tennis'
    }
);

module.exports = conn;