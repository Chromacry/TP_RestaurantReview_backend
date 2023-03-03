"use strict";
const mysql = require('mysql');
require('dotenv').config();
const dbConfig = require('../dbConfig.js');
class DebugDB{
    setQueryCode(sqlCode,callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = sqlCode;
        dbConnection.query(sql, callback);
        dbConnection.end();
    }
}

module.exports = DebugDB;