const express = require('express');
const { addCartItem, deleteCart, listItems, updateCartItem } = require('../controllers/cart.controller.js');
const router = express.Router();

router.post('/add', addCartItem);
router.get('/list', listItems);
router.put('/update', updateCartItem);
router.delete('/delete', deleteCart);

module.exports = router;