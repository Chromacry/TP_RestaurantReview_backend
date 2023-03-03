"use strict";
const mysql = require('mysql');
require('dotenv').config();
const dbConfig = require('../dbConfig.js');
const dbTableName = "Reviews";

class ReviewDB{
    addReview(review, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "INSERT INTO "+ dbTableName 
        + "(accountID,restaurantID,ratings,reviewSubject,reviewBody,reviewImage2,reviewImage1,reviewImage3,reviewImage4,reviewImage5, timestampCreated) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        dbConnection.query(sql,[review.getAccountID(),review.getRestaurantID(), review.getRatings(),review.getReviewSubject(), review.getReviewBody(),review.getReviewImage1(),review.getReviewImage2(),review.getReviewImage3(),review.getReviewImage4(),review.getReviewImage5(), review.getTimeStampCreated()], callback);
        dbConnection.end();
    }
    updateReviewByID(review, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "UPDATE " + dbTableName +" SET accountID = COALESCE(?, accountID), restaurantID = COALESCE(?, restaurantID), ratings = COALESCE(?, ratings), reviewSubject = COALESCE(?, reviewSubject), reviewBody = COALESCE(?, reviewBody), reviewImage1 = COALESCE(?, reviewImage1), reviewImage2 = COALESCE(?, reviewImage2), reviewImage3 = COALESCE(?, reviewImage3), reviewImage4 = COALESCE(?, reviewImage4), reviewImage5 = COALESCE(?, reviewImage5), timeStampUpdated = COALESCE(?, timeStampUpdated) WHERE id = ?";
        dbConnection.query(sql,[review.getAccountID(),review.getRestaurantID(), review.getRatings(),review.getReviewSubject(), review.getReviewBody(),review.getReviewImage1(),review.getReviewImage2(),review.getReviewImage3(),review.getReviewImage4(),review.getReviewImage5(), review.getTimeStampUpdated(), review.getID()], callback);
        dbConnection.end();
    }
    deleteReviewByID(review, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "UPDATE " + dbTableName +" SET timeStampDeleted = ? WHERE id = ?";
        dbConnection.query(sql,[review.getTimeStampDeleted(),review.getID()], callback);
        dbConnection.end();
    }
    getReviewByID(review, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT * FROM " + dbTableName +" WHERE id = ?";
        dbConnection.query(sql,[review.getID()], callback);
        dbConnection.end();
    }
    getAllReviewByRestaurant(review, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT Reviews.id, ratings, reviewSubject, reviewBody, reviewImage1,reviewImage2,reviewImage3,reviewImage4,reviewImage5, Reviews.timestampCreated, Reviews.timestampUpdated, Reviews.timestampDeleted, username, profileImage, token, restaurantName, RestaurantCategory.category, restaurantLogo, location, contact, openHours  FROM Reviews JOIN Accounts ON Reviews.accountID = Accounts.id JOIN Restaurants ON Reviews.restaurantID = Restaurants.id JOIN RestaurantCategory ON Restaurants.category = RestaurantCategory.id WHERE restaurantId = ?;";
        dbConnection.query(sql,[review.getRestaurantID()], callback);
        dbConnection.end();
    }
    getAllReviewByUser(review, callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT * FROM " + dbTableName +" WHERE accountID = ?";
        dbConnection.query(sql,[review.getAccountID()], callback);
        dbConnection.end();
    }
    getAllReview(callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT * FROM " + dbTableName;
        dbConnection.query(sql, callback);
        dbConnection.end();
    }
    getAllReviewwithRestaurantName(callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT reviews.restaurantID, reviews.ratings, restaurants.restaurantName, restaurants.description, restaurants.restaurantLogo, restaurants.restaurantImage FROM " + dbTableName + " INNER JOIN Restaurants ON " + dbTableName + ".restaurantID = Restaurants.id";
        dbConnection.query(sql, callback);
        dbConnection.end();
    }
    getLatestReviews(callback){
        const dbConnection = mysql.createConnection(dbConfig);
        dbConnection.connect();
        const sql = "SELECT Reviews.id, Reviews.restaurantid, Reviews.ratings, Accounts.username, Accounts.profileImage, Restaurants.restaurantName, Restaurants.restaurantLogo  FROM " + dbTableName + " INNER JOIN Accounts ON Reviews.accountID = Accounts.id INNER JOIN Restaurants ON Reviews.restaurantID = Restaurants.id ORDER BY Reviews.timestampCreated DESC LIMIT 4";
        dbConnection.query(sql, callback);
        dbConnection.end();
    }
}

module.exports = ReviewDB;