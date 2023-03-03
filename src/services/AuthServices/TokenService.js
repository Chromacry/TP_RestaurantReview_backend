const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const accountController = require('../../controllers/accountController');

const GenerateToken = (email) => {
    console.log("email", email)
    if (!email) return;
    const token = jwt.sign({email: email}, process.env.SECRET_TOKEN, {expiresIn: "1d"});
    console.log("Token generated: " + token);
    return token;
};

const CheckToken = (req, res) => {
    const secret_token = req.headers.secrettoken;
    const access_token = req.body.token;
    const data = jwt.verify(access_token, secret_token, (err, success) => {
        if (err) return "Invalid token";
        console.log("datasucess", success);
        return success;
    });
    res.json({data: data});
    // return token;
    console.log("data", data);
};

module.exports = {GenerateToken,CheckToken};