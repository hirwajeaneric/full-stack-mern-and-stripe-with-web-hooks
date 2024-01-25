const express = require('express');
const { test } = require('../controllers/user.controllers');

const userRoute = express.Router();

userRoute.post('/test', test);

module.exports = userRoute;