const bcrypt = require('bcrypt');
const globalConstants = require('../constants/GlobalContants.js');
const GenerateTokenService = require('../services/AuthServices/TokenService.js');
const RestaurantDB = require('../models/restaurantDB.js');
const Restaurant = require('../models/Restaurant.js');
const restaurantDB = new RestaurantDB();

const ReviewDB = require('../models/reviewDB.js');
const reviewDB = new ReviewDB();

const getAllRestaurant = (req, res) =>{
    restaurantDB.getAllRestaurants((error, result) => {
        if (error)
            res.json({
                message: error,
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        else
            res.json({
                message: "Successfully retrieved all restaurants",
                status: globalConstants.STATUS_CODES.SUCCESS_CODE,
                data: result
            });
    });
}

const getRestaurantByID = (req, res) =>{
    const restaurant = new Restaurant(req.body.id);
    restaurantDB.getRestaurantByID(restaurant, (error, result) =>{
        if (error)
            res.json({
                error : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        if (result[0] === undefined) 
        return res.json({
                message : "Restaurant ID not found!", 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                data: null
        });
        res.json({
            message: "Successfully retrieved restaurant ${restaurant}",
            status: globalConstants.STATUS_CODES.SUCCESS_CODE,
            data: result
        });
    });
}

const createRestaurant = (req, res) =>{
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const restaurant = new Restaurant(null, req.body.restaurantName,req.body.category, req.body.restaurantLogo, req.body.location, req.body.contact, req.body.openHours, dateNow);
    restaurantDB.addRestaurant(restaurant, (error, result) =>{
        if (error)
            res.json({
                error : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        res.json({
            message: result,
            status: globalConstants.STATUS_CODES.SUCCESS_CODE
        });
    });
}

const updateRestaurant = (req, res) =>{
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const restaurant = new Restaurant(req.body.id, req.body.restaurantName, req.body.category, req.body.restaurantLogo, req.body.location, req.body.contact, req.body.openHours, null, dateNow);
    restaurantDB.updateRestaurant(restaurant, (error, result) =>{
        if (error)
            res.json({
                error : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        if (result[0] === undefined) 
        return res.json({
                message : "Restaurant ID not found!", 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                data: null
        });
        res.json({
            message: result,
            status: globalConstants.STATUS_CODES.SUCCESS_CODE
        });
    });
}

const deleteRestaurant = (req, res) =>{
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const restaurant = new Restaurant(req.body.id, null, null, null, null, null, null, null, null, dateNow);
    restaurantDB.deleteRestaurantByID(restaurant, (error, result) =>{
        if (error)
            res.json({
                error : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        if (result[0] === undefined) 
        return res.json({
                message : "Restaurant ID not found!", 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                data: null
        });
            res.json({
                message: result,
                status: globalConstants.STATUS_CODES.SUCCESS_CODE
            });
    });
}

const getTopRestaurant = (req, res) =>{
    reviewDB.getAllReviewwithRestaurantName((error, result) =>{
        if (error) return res.json({
                message : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                data: null
        })
        // res.json(result);
        // console.log(result[0])
        const restaurantRatings = {};
        result.forEach((review) => {
            if (!restaurantRatings[review.restaurantID]) {
                restaurantRatings[review.restaurantID] = {
                    restaurantID: review.restaurantID,
                    restaurantName: review.restaurantName,
                    restaurantLogo: review.restaurantLogo,
                    restaurantImage: review.restaurantImage,
                    restaurantDescription: review.description,
                    totalRatings: 0,
                    numRatings: 0,
                };
            }
            restaurantRatings[review.restaurantID].totalRatings += review.ratings;
            restaurantRatings[review.restaurantID].numRatings += 1;
        });

        const sortedRestaurantRatings = Object.values(restaurantRatings).map((restaurant) => {
            restaurant.averageRating = restaurant.totalRatings / restaurant.numRatings;
            return restaurant;
        }).sort((a, b) => b.averageRating - a.averageRating);
        const top4Restaurants = sortedRestaurantRatings.slice(0, 4);
        res.json({
            message: "Successfully retrieved top 4 restaurants",
            status: globalConstants.STATUS_CODES.SUCCESS_CODE,
            data: top4Restaurants
        });
        
    })
}

module.exports = {getAllRestaurant, getRestaurantByID, createRestaurant, updateRestaurant, deleteRestaurant, getTopRestaurant}