const express = require('express');
const userRouter = require('./user.routes');

const allRoutes = express.Router();

allRoutes.use('/', userRouter);

module.exports = allRoutes;