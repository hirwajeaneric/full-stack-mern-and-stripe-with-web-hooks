import express from 'express';
import { addCartItem, deleteCart, listItems, updateCartItem } from '../controllers/cart.controller.js';
const router = express.Router();

router.post('/add', addCartItem);
router.get('/list', listItems);
router.put('/update', updateCartItem);
router.delete('/delete', deleteCart);

export default router;