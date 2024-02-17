const CartItemModel = require('../models/cart.model');

const addCartItem = async (req, res, next) => {
    try {
        const itemExists = await CartItemModel.findOne({
            productName: req.params.productName, 
            customerId: req.query.customerId,
            status: 'pending'
        });

        if (itemExists) {
            var newQuantity = itemExists.quantity + 1;
            var newTotal = itemExists.total + req.body.price;
            
            const updatedCartItem = await CartItemModel.findByIdAndUpdate(
                itemExists._id,
                {
                    $set: {
                        quantity: newQuantity,
                        total: newTotal
                    }
                },
                {
                    new: true
                }
            );
            
            if (updatedCartItem) {
                const allItems = await CartItemModel.find({ customerId: updatedCartItem.customerId });
                res.status(200).json({ items: allItems });
            }

        } else {
            const newItem = await CartItemModel.create(req.body);
            if (newItem) {
                const allItems = await CartItemModel.find({ customerId: newItem.customerId, status: 'pending' });
                res.status(200).json({ message: 'Item added to cart', items: allItems });
            }
        }
    } catch (error) {
        next(error);
    }
};

const listItems = async (req, res, next) => {
    try {
        const items = await CartItemModel.find({ customerId: req.query.customerId });
        res.status(200).json({ items });
    } catch (error) {
        next(error);
    }
};

const listAllItems = async (req, res, next) => {
    try {
        const items = await CartItemModel.find();
        res.status(200).json({ items });
    } catch (error) {
        next(error);
    }
}

// Update cartItem 
const updateCartItem = async (req, res, next) => {
    try {
        if (req.body.price || req.body.quantity) {
            req.body.total = req.body.price * req.body.quantity;
        }

        const updatedItem = await CartItemModel.findByIdAndUpdate(req.query.id, { $set: req.body });
        if (updatedItem) {
            const allItems = await CartItemModel.find({ customerId: updatedItem.customerId, status: 'pending' });
            res.status(200).json({ items: allItems });
        }
    } catch (error) {
        next(error);
    }
};

const completePayment = (req, res) => {

};


const deleteCart = async (req, res, next) => {
    try {
        const deletedItem = await CartItemModel.findByIdAndDelete(req.query.id);

        if (deletedItem) {
            const allItems = await CartItemModel.find({ customerId: deletedItem.customerId, status: 'pending' });
            res.status(200).json({ items: allItems });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addCartItem,
    listItems,
    listAllItems,
    completePayment,
    updateCartItem,
    deleteCart
}