const OrderModel = require('../models/order.model.js');

// Update order 
const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(req.query.id, { $set: req.body }, { new: true });
        res.status(200).json({ order: updatedOrder });
    } catch (error) {
        next(error);
    }
};

const listOrders = async (req, res, next) => {
    try {
        const orders = await OrderModel.find({});
        res.status(200).json({ orders: orders });
    } catch (error) {
        next(error);
    }
}

const clientOrders = async (req, res, next) => {
    try {
        const orders = await OrderModel.find({ clientId: req.query.clientId });
        res.status(200).json({ orders: orders });
    } catch (error) {
        next(error);
    }
}

const findById = async (req, res, next) => {
    try {
        const foundOrder = await OrderModel.findById(req.query.id);
        if (foundOrder) {
            res.status(200).json({ order: foundOrder });
        }
    } catch (error) {
        next(error);
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        await OrderModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Order has been deleted');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    updateOrder,
    deleteOrder,
    listOrders,
    clientOrders,
    findById
}