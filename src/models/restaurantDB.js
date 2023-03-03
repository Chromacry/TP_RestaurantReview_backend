"use strict";
const mysql = require('mysql');
require('dotenv').config();
const dbConfig = require('../dbConfig.js');
const dbName = process.env.MYSQLDB_DATABASE || "restaurant_review";
const dbTableName = "Restaurants";
class RestaurantDB{
    getAllRestaurants(callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT * FROM " + dbName +"."+ dbTableName;
        dbConnection.query(sql, callback);
        dbConnection.end();
    }
    getRestaurantByID(restaurant, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT * FROM " + dbName +"."+ dbTableName +" WHERE id = ?";
        dbConnection.query(sql,[restaurant.getID()], callback);
        dbConnection.end();
    }
    addRestaurant(restaurant, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "INSERT INTO " + dbName +"."+ dbTableName +" (restaurantName,category,restaurantLogo,location,contact,openHours, timestampCreated) VALUES (?,?,?,?,?,?,?)";
        dbConnection.query(sql,[restaurant.getRestaurantName(), restaurant.getRestaurantCategory(), restaurant.getRestaurantLogo(), restaurant.getRestaurantLocation(), restaurant.getRestaurantContact(),restaurant.getRestaurantOpenHours(),restaurant.getTimeStampCreated()], callback);
        dbConnection.end();
    }
    updateRestaurant(restaurant, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "UPDATE " + dbName +"."+ dbTableName +" SET restaurantName = COALESCE(?, restaurantName), category = COALESCE(?, category), restaurantLogo = COALESCE(?, restaurantLogo), location = COALESCE(?, location), contact = COALESCE(?, contact), openHours = COALESCE(?, openHours), timestampUpdated = COALESCE(?, timestampUpdated) WHERE id = ?";
        dbConnection.query(sql,[restaurant.getRestaurantName(), restaurant.getRestaurantCategory(), restaurant.getRestaurantLogo(), restaurant.getRestaurantLocation(), restaurant.getRestaurantContact(),restaurant.getRestaurantOpenHours(),restaurant.getTimeStampUpdated(), restaurant.getID()], callback);
        dbConnection.end();
    }
    deleteRestaurantByID(restaurant, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "UPDATE " + dbName +"."+ dbTableName +" SET timeStampDeleted = ? WHERE id = ?";
        dbConnection.query(sql,[restaurant.getTimeStampDeleted(), restaurant.getID()], callback);
        dbConnection.end();
    }
    
}

module.exports = RestaurantDB;