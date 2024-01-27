const express = require('express');
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');

const allRoutes = express.Router();

allRoutes.use('/', userRouter);
allRoutes.use('/', authRouter);

module.exports = allRoutes;