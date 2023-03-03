const express = require("express");
const path = require("path");
const router = express.Router();
const rootPath = path.resolve(__dirname, '..');
const globalConstants = require('../../constants/GlobalContants');

const restaurantCategoryController = require('../../controllers/restaurantCategoryController');
const restaurantController = require('../../controllers/restaurantController');

// Restaurant Category Controller
router.post("/category/create", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantCategoryController.createRestaurantCategory(req,res);
});

router.put("/category/update", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantCategoryController.updateRestaurantCategoryByID(req,res);
});

router.delete("/category/delete", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantCategoryController.deleteRestaurantCategoryByID(req,res);
});

router.post("/category/get/all", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantCategoryController.getAllRestaurantCategory(req,res);
});

router.post("/category/get", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantCategoryController.getRestaurantCategoryByID(req,res);
});

// Restaurant Controller
router.post("/create", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantController.createRestaurant(req,res);
});

router.put("/update", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantController.updateRestaurant(req,res);
});

router.delete("/delete", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantController.deleteRestaurant(req,res);
});

router.post("/get/all", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantController.getAllRestaurant(req,res);
});

router.post("/get", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantController.getRestaurantByID(req,res);
});

router.post("/get/toprestaurant", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return restaurantController.getTopRestaurant(req,res);
});

module.exports = router;
