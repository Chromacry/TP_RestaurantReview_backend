"use strict";
const mysql = require('mysql');
require('dotenv').config();
const dbConfig = require('../dbConfig.js');
const dbName = process.env.MYSQLDB_DATABASE || "restaurant_review";
const dbTableName = "RestaurantCategory";
class RestaurantCategoryDB{
    getAllRestaurantCategory(callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT * FROM " + dbName +"."+ dbTableName;
        dbConnection.query(sql, callback);
        dbConnection.end();
    }
    getRestaurantCategoryByID(restaurantCategory, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT category FROM " + dbName +"."+ dbTableName +" WHERE id = ?";
        dbConnection.query(sql,[restaurantCategory.getID()], callback);
        dbConnection.end();
    }
    addRestaurantCategory(restaurantCategory, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "INSERT INTO " + dbName +"."+ dbTableName +" (category, timestampCreated) VALUES (?,?)";
        dbConnection.query(sql,[restaurantCategory.getCategory(), restaurantCategory.getTimeStampCreated()], callback);
        dbConnection.end();
    }
    updateRestaurantCategoryByID(restaurantCategory, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "UPDATE " + dbName +"."+ dbTableName +" SET category = COALESCE(?, category), timestampUpdated = ? WHERE id = ?"
        dbConnection.query(sql,[restaurantCategory.getCategory(), restaurantCategory.getTimeStampUpdated(),restaurantCategory.getID()], callback);
        dbConnection.end();
    }
    deleteRestaurantCategoryByID(restaurantCategory, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "UPDATE " + dbName +"."+ dbTableName +" SET timeStampDeleted = ? WHERE id = ?";
        dbConnection.query(sql,[restaurantCategory.getTimeStampDeleted(),restaurantCategory.getID()], callback);
        dbConnection.end();
    }
}

module.exports = RestaurantCategoryDB;