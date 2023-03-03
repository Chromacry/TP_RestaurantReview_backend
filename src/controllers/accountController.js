require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AccountDB = require("../models/accountDB.js");
const Account = require("../models/Account.js");
const Mail = require("../models/Mail.js");
const globalConstants = require("../constants/GlobalContants");
// const GenerateTokenService = require("../services/AuthServices/TokenService.js");
const EmailService = require("../services/EmailService/EmailService.js");
let accountDB = new AccountDB();

const getAllUsers = (req, res) => {
  accountDB.getAllUsers(function (error, result) {
    if (error) {
      res.json({
        error: error,
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
      });
    } else {
      res.json({
        message: result,
        status: globalConstants.STATUS_CODES.SUCCESS_CODE,
      });
    }
  });
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hashPassword) {
    if (err) {
      res.json({
        error: err,
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
      });
    }
    const dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");
    const accessToken = jwt.sign(
      { email: req.body.email },
      process.env.SECRET_TOKEN,
      { expiresIn: "1d" }
    );
    const account = new Account(
      null,
      req.body.username,
      hashPassword,
      req.body.email,
      req.body.contactnumber,
      null,
      accessToken,
      dateNow,
      null,
      null
    );
    accountDB.getUserByEmailAddress(account, function (error, result) {
      if (error) {
        res.json({
          message: error,
          status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        });
      }
      if (result[0])
        return res.json({
          message:
            "Email address has been used. Please use a different email address or Login if you already have an account.",
          status: globalConstants.STATUS_CODES.SUCCESS_CODE,
        });
      accountDB.addUser(account, function (error, result) {
        if (error) {
          res.json({
            message: error,
            status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
          });
        } else {
          const mailInfo = new Mail(
            null,
            account.getEmail(),
            "Heavenly Eats | Registration completed!",
            "Welcome to Heavenly Eats! We hope you enjoy this site to find your next meal! \n to login head to: http://127.0.0.1:3000/login"
          );
          const mail = EmailService.sendMail(mailInfo);
          res.setHeader("AccessToken", accessToken);
          res.json({
            message: "User registrated successfully!",
            status: globalConstants.STATUS_CODES.SUCCESS_CODE,
            data: result,
          });
        }
      });
    });
  });
};

const updateUser = (req, res) => {
  // TODO: need to implement checking password before updating to new password
  const dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");
  const newDateNow = dateNow.toLocaleString("en-SG", "Asia/Singapore");

  bcrypt.hash(req.body.password, 10, function (err, hashPassword) {
    const account = new Account(
      req.body.id,
      req.body.username,
      hashPassword,
      req.body.email,
      req.body.contactnumber,
      req.body.profileImage,
      req.headers.accesstoken,
      null,
      dateNow
    );
    console.log(account);
    accountDB.updateUserByID(account, function (error, result) {
      if (error)
        return res.json({
          error: error,
          status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        });
      res.json({
        message: result,
        status: globalConstants.STATUS_CODES.SUCCESS_CODE,
      });
    });
  });
};

const deleteUser = (req, res) => {
  const dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");
  const account = new Account(
    req.body.id,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    dateNow
  );
  console.log(account);
  accountDB.deleteUserByID(account, function (error, result) {
    if (error)
      return res.json({
        message: error,
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
      });
    res.json({
      message: result,
      status: globalConstants.STATUS_CODES.SUCCESS_CODE,
    });
  });
};

const getUserByEmail = (req, res) => {
  let account = new Account(
    req.body.id,
    null,
    req.body.password,
    req.body.email
  );
  console.log(account);
  accountDB.getUserByEmailAddress(account, function (error, result) {
    if (error) {
      res.json({
        error: error,
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
      });
      return;
    }
    if (result[0] === undefined)
      return res.json({
        message: "Email address not found!",
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        data: null,
      });
    if (!result[0].password) {
      return res.json({
        message: result,
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
      });
    }

    const passwordStatus = bcrypt.compare(
      account.getPassword(),
      result[0].password
    );
    if (!passwordStatus) {
      res.json({
        message: "password do not match!",
        status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE,
      });
    }
    res.json({
      message: result,
      status: globalConstants.STATUS_CODES.SUCCESS_CODE,
    });
  });
};

const getUserByID = (req, res) => {
  let account = new Account(req.body.id);
  console.log(account);
  accountDB.getUserByID(account, function (error, result) {
    if (error)
      return res.json({
        error: error,
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
      });
    if (result[0] === undefined)
      return res.json({
        message: "ID not found!",
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        data: result[0],
      });
    res.json({
      message: "user retrieved successfully!",
      status: globalConstants.STATUS_CODES.SUCCESS_CODE,
      data: result[0]
    });
  });
};

const loginUser = (req, res) => {
  // TODO: redirect to home page as logged in on frontend
  const account = new Account();
  account.setEmail(req.body.email);
  let userData;
  accountDB.getUserByEmailAddress(account, (error, result) => {
    if (error)
      return res.json({
        message: error,
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        data: null,
      });
    if (result[0] === undefined)
      return res.json({
        message: "Email address not found! Please register",
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        data: null,
      });

    if (result[0].timestampDeleted !== null)
      return res.json({
        message: "Email address not found! Please register",
        status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE,
      });
    const dbPassword = result[0].password;
    account.setID(result.id);
    userData = result;
    bcrypt.compare(req.body.password, dbPassword, (error, result) => {
      if (error)
        return res.json({
          message: error,
          status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
          data: null,
        });
      if (!result)
        return res.json({
          message: "Wrong password!",
          status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE,
          data: null,
        });

      // const new_token = GenerateTokenService.GenerateToken(req.body.email);
      const new_token = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_TOKEN,
        { expiresIn: "1d" }
      );
      console.log(new_token);
      account.setToken(new_token);
      account.setID(userData[0].id);
      accountDB.updateUserByID(account, (error, result) => {
        if (error) {
          res.json({
            message: error,
            status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
            data: null,
          });
        }
        res.setHeader("AccessToken", account.getToken());
        res.json({
          message: "Successfully Logged in",
          status: globalConstants.STATUS_CODES.SUCCESS_CODE,
          data: userData,
        });
      });
    });
  });
};

const getUser = (req, res) => {
  const token = jwt.verify(
    req.body.token,
    process.env.SECRET_TOKEN,
    (err, success) => {
      if (err) return "Invalid token";
      console.log("datasucess", success);
      return success;
    }
  );
  res.json({ token: token });
  // return GenerateTokenService.CheckToken(req, res);
};

const forgetPassword = (req, res) => {
  const token = crypto.randomBytes(64).toString("hex");
  const forgotToken = jwt.sign(
    { token: token, email: req.body.email },
    process.env.SECRET_TOKEN, {expiresIn: "300s"}
  );
  const account = new Account();
  account.setEmail(req.body.email);
  accountDB.getUserByEmailAddress(account, (error, result) => {
    if (error)
      return res.json({
        message: error,
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        data: null,
      });
    if (result[0] === undefined)
      return res.json({
        message: "Email address not found! Please register instead.",
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        data: null,
      });

    const mailInfo = new Mail(
      null,
      account.getEmail(),
      "Heavenly Eats | Forget Password",
      "To reset your password, please click here. http://127.0.0.1:3000/resetpassword?token=" + forgotToken
    );
    const mail = EmailService.sendMail(mailInfo);
    res.json({
      message: "Email sent successfully",
      status: globalConstants.STATUS_CODES.SUCCESS_CODE,
    });
  });
};

const resetPassword = (req, res) => {
  console.log(req.body.token)
  const tokenStatus = jwt.verify(req.body.token, process.env.SECRET_TOKEN);

  if (tokenStatus === "invalid")
    res.json({
      message: "Invalid token",
      status: globalConstants.STATUS_CODES.UNAUTHORIZE_CODE,
    });
  const account = new Account();
  account.setEmail(req.body.email);
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    if (error)
      return res.json({
        message: error,
        status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
      });
    account.setPassword(hash);

    accountDB.updateUserPasswordByEmailAddress(account, (error, result) => {
      if (error)
        return res.json({
          message: err,
          status: globalConstants.STATUS_CODES.INTERNAL_SERVER_ERROR_CODE,
        });
    });

    res.json({
      message: "reset password successfully",
      status: globalConstants.STATUS_CODES.SUCCESS_CODE,
    });
  });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getAllUsers,
  getUserByID,
  loginUser,
  getUser,
  forgetPassword,
  resetPassword,
};
