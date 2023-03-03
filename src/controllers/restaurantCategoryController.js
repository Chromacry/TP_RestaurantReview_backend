const bcrypt = require('bcrypt');
const globalConstants = require('../constants/GlobalContants.js');
const GenerateTokenService = require('../services/AuthServices/TokenService.js');
const RestaurantCategoryDB = require('../models/RestaurantCategoryDB.js');
const RestaurantCategory = require('../models/RestaurantCategory.js');

const restaurantCategoryDB = new RestaurantCategoryDB();

const createRestaurantCategory = (req, res) =>{
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const restaurantCategory = new RestaurantCategory(null, req.body.category, dateNow);
    restaurantCategoryDB.addRestaurantCategory(restaurantCategory, function(error, result){
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

const updateRestaurantCategoryByID = (req, res) =>{
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const restaurantCategory = new RestaurantCategory(req.body.id, req.body.category, null, dateNow);
    restaurantCategoryDB.updateRestaurantCategoryByID(restaurantCategory, function(error, result){
        if (error)
            res.json({
                error : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        if (result[0] === undefined) 
        return res.json({
                message : "Category ID not found!", 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                data: null
        });
        res.json({
            message: result,
            status: globalConstants.STATUS_CODES.SUCCESS_CODE
        });
    });
}

const deleteRestaurantCategoryByID = (req, res) =>{
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const restaurantCategory = new RestaurantCategory(req.body.id, null,null,null, dateNow);
    restaurantCategoryDB.deleteRestaurantCategoryByID(restaurantCategory, function(error, result){
        if (error)
        res.json({
            error : error, 
            status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
        });
        if (result === []) 
        return res.json({
                message : "Category ID not found!", 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                data: null
        });
        res.json({
            message: result,
            status: globalConstants.STATUS_CODES.SUCCESS_CODE
        });
    });
}

const getAllRestaurantCategory = (req, res) =>{
    restaurantCategoryDB.getAllRestaurantCategory(function(error, result){
        if (error){
            res.json({
                error : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        }
        else{
            res.json({
                message: result,
                status: globalConstants.STATUS_CODES.SUCCESS_CODE
            });
        }
    });
}

const getRestaurantCategoryByID = (req, res) =>{
    const restaurantCategory = new RestaurantCategory(req.body.id);
    restaurantCategoryDB.getRestaurantCategoryByID(restaurantCategory, function(error, result){
        if (error)
        res.json({
            error : error, 
            status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
        });
        if (result[0] === undefined) 
        return res.json({
                message : "Category ID not found!", 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                data: null
        });
        res.json({
            message: result,
            status: globalConstants.STATUS_CODES.SUCCESS_CODE
        });
    });
}



module.exports = {createRestaurantCategory, updateRestaurantCategoryByID, deleteRestaurantCategoryByID, getAllRestaurantCategory, getRestaurantCategoryByID}