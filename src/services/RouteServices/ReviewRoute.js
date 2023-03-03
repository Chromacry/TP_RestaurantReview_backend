const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const router = express.Router();
const rootPath = path.resolve(__dirname, '..');
const globalConstants = require('../../constants/GlobalContants');
const reviewController = require('../../controllers/reviewController');
const accountController = require('../../controllers/accountController');


router.post("/create", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    const token = jwt.verify(req.body.token, secret_token,(err, success) => {
        if (err) return "Invalid token";
        console.log("datasucess", success);
        return success;
    });
    if (token === "Invalid token") 
        return res.json({
        message:"Invalid token",
        status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
    })
    else{
        return reviewController.createReview(req,res);
    }
});

router.put("/update", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    const token = jwt.verify(req.body.token, secret_token,(err, success) => {
        if (err) return "Invalid token";
        console.log("datasucess", success);
        return success;
    });
    if (token === "Invalid token") 
        return res.json({
        message:"Invalid token",
        status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
    })
    else{
    return reviewController.updateReview(req,res);
    }
});

router.delete("/delete", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    console.log("incoming token: ", req.body);
    const token = jwt.verify(req.body.token, secret_token,(err, success) => {
        if (err) return "Invalid token";
        console.log("datasucess", success);
        return success;
    });
    console.log(token);
    if (token === "Invalid token") 
        return res.json({
        message:"Invalid token",
        status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
    })
    else{
    return reviewController.deleteReview(req,res);
    }
});

router.post("/get/all", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return reviewController.getAllReview(req,res);
});

router.post("/get", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return reviewController.getReviewByID(req,res);
});

router.post("/get/all/restaurant", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return reviewController.getAllReviewByRestaurant(req,res);
});

router.post("/get/all/user", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return reviewController.getAllReviewByUser(req,res);
});

router.post("/get/latestreview", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return reviewController.getLatestReview(req,res);
});

module.exports = router;
