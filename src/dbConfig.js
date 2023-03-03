const mysql = require('mysql');
require('dotenv').config()
console.log(process.env.MYSQL_HOSTNAME);
const dbConfig = {
    host: process.env.MYSQL_HOSTNAME || '127.0.0.1',
    port: '3306',
    user:  process.env.MYSQLDB_USER || 'root',
    password: process.env.MYSQLDB_ROOT_PASSWORD ||'Temasek_123',
    database: process.env.MYSQLDB_DATABASE || "restaurant_review"
};
    // host: process.env.MYSQL_HOSTNAME,
    // port: process.env.MYSQL_PORT,
    // user: 'root',
    // password: process.env.MYSQL_ROOT_PASSWORD,
    // database: process.env.MYSQL_DATABASE
// });

// connection.connect(err => {    // test our connection and console.log error if there is one
//     if (err) throw err;
//     console.log('Connected To DB');
// });
module.exports = dbConfig;