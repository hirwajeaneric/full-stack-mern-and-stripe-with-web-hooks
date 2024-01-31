const express = require('express');
const { createCheckoutSession, checkSessionStatus } = require('../controllers/checkout');
const { getClientSecret } = require('../controllers/checkout_2');
const checkoutRouter = express.Router();

checkoutRouter.post('/create-checkout-session', createCheckoutSession)
checkoutRouter.get('/session-status', checkSessionStatus);
checkoutRouter.post('/secret', getClientSecret);

module.exports = checkoutRouter;