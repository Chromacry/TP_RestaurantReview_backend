const express = require("express");
const path = require("path");
const router = express.Router();
const rootPath = path.resolve(__dirname, '..');
const globalConstants = require('../../constants/GlobalContants');
const debugController = require('../../controllers/debugController');
const searchSerice = require('../../services/SearchService/searchService');

router.post("/search", (req, res) => {
    const secret_token = req.headers.secrettoken.split(' ')[1];
    if (secret_token !== process.env.SECRET_TOKEN){
        res.send({
            message: "Incorrect secret token or empty string",
            status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE
        });
        return;
    }
    return searchSerice.search(req,res);
});

module.exports = router;
