"use strict";
const mysql = require('mysql');
const dbConfig = require('../dbConfig.js');
const dbName = process.env.MYSQLDB_DATABASE || "restaurant_review";
const dbTableName = "Accounts";
class AccountDB{
    getAllUsers(callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT id, username, emailaddress, contactnumber, profileImage, token, timestampCreated, timestampUpdated, timestampDeleted FROM " + dbName +"."+ dbTableName;
        dbConnection.query(sql, callback);
        dbConnection.end();
    }
    getUserByID(account, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT * FROM " + dbName + "."+ dbTableName +" WHERE id = ?";
        dbConnection.query(sql,[account.getID()], callback);
        dbConnection.end();
    }
    getUserByEmailAddress(account, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT * FROM " + dbName + "."+ dbTableName +" WHERE emailaddress = ?";
        dbConnection.query(sql,[account.getEmail()], callback);
        dbConnection.end();
    }
    addUser(account, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "INSERT INTO " + dbName +"."+ dbTableName +" (username,password,emailaddress,contactnumber, profileImage,token,timestampCreated) VALUES (?,?,?,?,?,?,?)";
        dbConnection.query(sql,[account.getUsername(), account.getPassword(), account.getEmail(), account.getContactNumber(), account.getProfileImage(),account.getToken(), account.getTimeStampCreated()], callback);
        dbConnection.end();
    }
    updateUserByID(account, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "UPDATE " + dbName + "."+ dbTableName +" SET username = COALESCE(?, username), password = COALESCE(?, password), emailaddress = COALESCE(?, emailaddress), contactnumber = COALESCE(?, contactnumber), profileImage = COALESCE(?, profileImage), token = COALESCE(?, token), timeStampUpdated = COALESCE(?, timeStampUpdated) WHERE id = ?";
        dbConnection.query(sql, [account.getUsername(), account.getPassword(), account.getEmail(), account.getContactNumber(), account.getProfileImage(), account.getToken(), account.getTimeStampUpdated(), account.getID()], callback);
        dbConnection.end();
    }
    updateUserPasswordByEmailAddress(account, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "UPDATE " + dbName + "."+ dbTableName +" SET password = COALESCE(?, password) WHERE emailaddress = ?";
        dbConnection.query(sql, [account.getPassword(), account.getEmail()], callback);
        dbConnection.end();
    }
    deleteUserByID(account, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "UPDATE " + dbName + "."+ dbTableName +" SET timeStampDeleted = ? WHERE id = ?";
        dbConnection.query(sql, [account.getTimeStampDeleted(), account.getID()], callback);
        dbConnection.end();
    }
}

module.exports = AccountDB;