const CartItemModel = require('../models/cartItem.js');

const addCartItem = async (req, res, next) => {
    try {
        const itemExists = await CartItemModel.findOne({
            customerId: req.body.customerId,
            productName: req.body.productName
        });

        if (itemExists) {
            var newQuantity = itemExists.quantity + 1;
            var newTotal = itemExists.total + req.body.price;

            const updatedCartItem = await CartItemModel.findByIdAndUpdate(
                itemExists._id,
                {
                    $set: {
                        total: newTotal,
                        quantity: newQuantity,
                    }
                },
                {
                    new: true,
                }
            );

            if (updatedCartItem) {
                const allItems = await CartItemModel.find({ customerId: updatedCartItem.customerId });
                res.status(200).json({ items: allItems });
            }
        } else {
            const newCartItem = await CartItemModel.create(req.body);
        
            if (newCartItem) {
                const allItems = await CartItemModel.find({ customerId: newCartItem.customerId, status: 'pending' });
                res.status(200).json({ items: allItems });
            }
        }
    } catch (error) {
        next(error);
    }
};


// List items
const listItems = async (req, res, next) => {
    try {
        const items = await CartItemModel.find({ customerId: req.query.customerId });
        res.status(201).json({ items });
    } catch (error) {
        next(error);
    }
};


// Update cartItem 
const updateCartItem = async (req, res, next) => {
    try {
        if (req.body.price || req.body.quantity) {
            req.body.total = req.body.price * req.body.quantity;
        }

        const updatedCartItem = await CartItemModel.findByIdAndUpdate(
            req.query.id,
            {
                $set: req.body
            },
            {
                new: true,
            }
        );

        if (updatedCartItem) {
            const allItems = await CartItemModel.find({ customerId: updatedCartItem.customerId, status: 'pending' });
            res.status(200).json({ items: allItems });
        }
    } catch (error) {
        next(error);
    }
};

const confirmPayment = async (req, res) => { 
    try {
        const orderCode = `${Math.floor(Math.random() * 10000)}_${new Date().getTime()}`;
        const updates = await CartItemModel.updateMany({ customerId: req.query.customerId }, { status: 'confirmed', orderCode: orderCode });
        console.log(updates);
        if (!updates) {
            res.status(400).json({ message: 'Payment Failed' });
        }
        // const completedOrder = await CartItemModel.find({ customerId: updates.customerId });
        res.status(200).json({ message: 'Payment confirmed' });
    } catch (error) {
        next(error);
    }
};


const deleteCart = async (req, res, next) => {
    try {
        const deletedItem = await CartItemModel.findByIdAndDelete(req.query.id);

        if (deletedItem) {
            const allItems = await CartItemModel.find({ customerId: deletedItem.customerId });
            res.status(200).json({ items: allItems });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addCartItem,
    listItems,
    confirmPayment,
    updateCartItem,
    deleteCart
}