const express = require("express");
const path = require("path");
const router = express.Router();
const rootPath = path.resolve(__dirname, '..');
const globalConstants = require('../../constants/GlobalContants');
const debugController = require('../../controllers/debugController');

router.post("/test", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    console.log(secret_token);
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    console.log("Executing...");
    return debugController.createQuery(req,res);
});

module.exports = router;
