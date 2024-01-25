const express = require('express');
const { createCheckoutSession, checkSessionStatus } = require('../controllers/checkout');
const checkoutRouter = express.Router();

checkoutRouter.post('/create-checkout-session', createCheckoutSession)
checkoutRouter.get('/session-status', checkSessionStatus);

module.exports = checkoutRouter;