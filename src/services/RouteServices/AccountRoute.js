const express = require("express");
const path = require("path");
const router = express.Router();
const rootPath = path.resolve(__dirname, '..');
const globalConstants = require('../../constants/GlobalContants');
const tokenService = require('../AuthServices/TokenService');
const accountController = require('../../controllers/accountController');

router.post("/user/get", (req, res) => {
    // tokenService.CheckToken(req, res);
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return accountController.getUserByID(req,res);
});
router.post("/user/get/email", (req, res) => {
    // tokenService.CheckToken(req, res);
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return accountController.getUserByEmail(req,res);
});

router.post("/user/get/all", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return accountController.getAllUsers(req,res);
});

router.post("/user/create", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return accountController.createUser(req,res);
});

router.put("/user/update", (req, res) => {
    // console.log(req.headers['AccessToken']);
    // console.log(req.headers.accesstoken);
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return accountController.updateUser(req,res);
});

router.delete("/user/delete", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return accountController.deleteUser(req,res);
});

router.post("/user/login", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    accountController.loginUser(req,res);
});

router.post("/user/check", (req, res) => {
    if (req.headers.secrettoken !== "Bear " + process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    accountController.getUser(req,res);
});

router.post("/user/forgetpassword", (req, res) => {
    const secretToken = req.headers.secrettoken.split(" ")[1];
    if (secretToken !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty str   ing",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    accountController.forgetPassword(req,res);
});

router.patch("/user/resetpassword", (req, res) => {
    const secretToken = req.headers.secrettoken.split(" ")[1];
    if (secretToken !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    accountController.resetPassword(req,res);
});
module.exports = router;
