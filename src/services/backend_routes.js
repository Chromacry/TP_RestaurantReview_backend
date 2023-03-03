const express = require("express");
const path = require("path");
const router = express.Router();
const rootPath = path.resolve(__dirname, '..');

const accountRoute = require('./RouteServices/AccountRoute');
const restaurantRoute = require('../services/RouteServices/RestaurantRoute');
const reviewRoute = require('../services/RouteServices/ReviewRoute');
const debugRoute = require('../services/RouteServices/DebugRoute');
const searchRoute = require('../services/RouteServices/SearchRoute');
// * Backend routes
router.use("/account", accountRoute);
router.use("/review", reviewRoute);
router.use("/restaurant", restaurantRoute);
router.use("/debug", debugRoute);
router.use("/extra", searchRoute);
module.exports = router;
