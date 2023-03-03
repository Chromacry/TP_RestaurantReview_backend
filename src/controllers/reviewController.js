const bcrypt = require('bcrypt');
const globalConstants = require('../constants/GlobalContants.js');
const GenerateTokenService = require('../services/AuthServices/TokenService.js');
const ReviewDB = require('../models/reviewDB.js');
const Review = require('../models/Review.js');
const reviewDB = new ReviewDB();

const createReview = (req, res) => {
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const review = new Review(null, req.body.accountID, req.body.restaurantID, req.body.ratings, req.body.reviewSubject, req.body.reviewBody, req.body.reviewImage1, req.body.reviewImage2, req.body.reviewImage3, req.body.reviewImage4, req.body.reviewImage5, dateNow);
    reviewDB.addReview(review, function(error, result){
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

const updateReview = (req, res) => {
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const review = new Review(req.body.id, req.body.accountID, req.body.restaurantID, req.body.ratings, req.body.reviewSubject, req.body.reviewBody, req.body.reviewImage1, req.body.reviewImage2, req.body.reviewImage3, req.body.reviewImage4, req.body.reviewImage5, null, dateNow);
    reviewDB.updateReviewByID(review, function(error, result){
        if (error)
            res.json({
                message : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
        });
        if(result){
            res.json({
                message: result,
                status: globalConstants.STATUS_CODES.SUCCESS_CODE
            });
        }
    });
}

const deleteReview = (req, res) => {
    const dateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const review = new Review();
    review.setTimeStampDeleted(dateNow);
    review.setID(req.body.id);
    reviewDB.deleteReviewByID(review, function(error, result){
        if (error)
            res.json({
                error : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        console.log(result);
        // if (result[0] === undefined) 
        // return res.json({
        //         message : "Review ID not found!", 
        //         status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        //         data: null
        // });
        res.json({
            message: result,
            status: globalConstants.STATUS_CODES.SUCCESS_CODE
        });
    });
}

const getReviewByID = (req, res) => {
    const review = new Review(req.body.id);
    reviewDB.getReviewByID(review, function(error, result){
        if (error)
        res.json({
            error : error, 
            status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
        });
        if (result[0] === undefined) 
        return res.json({
                message : "Review ID not found!", 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                data: null
        });
        res.json({
            message: result,
            status: globalConstants.STATUS_CODES.SUCCESS_CODE
        });
    });
}

const getAllReviewByUser = (req, res) => {
    const review = new Review(null, req.body.userID);
    reviewDB.getAllReviewByUser(review, function(error, result){
        if (error)
        res.json({
            error : error, 
            status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
        });
        if (result[0] === undefined) 
            return res.json({
                    message : "User ID not found!", 
                    status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                    data: null
            });
        res.json({
            message: result,
            status: globalConstants.STATUS_CODES.SUCCESS_CODE
        });
    });
}

const getAllReviewByRestaurant = (req, res) => {
    const review = new Review(null, null, req.body.restaurantID);
    reviewDB.getAllReviewByRestaurant(review, function(error, result){
        if (error)
        res.json({
            message : error, 
            status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
        });
        if (result[0] === undefined) return res.json({
                message : "Restaurant ID not found!", 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
                data: null
        });
        res.json({
            message: "Restaurant Reviews Retrieved Successfully!",
            status: globalConstants.STATUS_CODES.SUCCESS_CODE,
            data: result
        });
    });
}

const getAllReview = (req, res) => {
    reviewDB.getAllReview(function(error, result){
        if (error){
            res.json({
                message : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        }
        else{
            res.json({
                message: "All Reviews retrieved successfully",
                status: globalConstants.STATUS_CODES.SUCCESS_CODE,
                data: result
            });
        }
    });
}

const getLatestReview = (req, res) => {
    reviewDB.getLatestReviews(function(error, result){
        if (error){
            res.json({
                message : error, 
                status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE
            });
        }
        else{
            res.json({
                message: "Top 4 Reviews retrieved successfully",
                status: globalConstants.STATUS_CODES.SUCCESS_CODE,
                data: result
            });
        }
    });
}

module.exports = {createReview, updateReview, deleteReview, getReviewByID, getAllReview, getAllReviewByUser, getAllReviewByRestaurant, getLatestReview}