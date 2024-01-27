import CartItemModel from '../models/cartItem.js';

export const addCartItem = async (req, res, next) => {
    try {
        const itemExists = await CartItemModel.findOne({
            customerId: req.body.customerId,
            productName: req.body.productName
        });

        if (itemExists) {
            var newQuantity = itemExists.quantity + 1;
            var newPrice = itemExists.price + req.body.price;

            const updatedCartItem = await CartItemModel.findByIdAndUpdate(
                itemExists._id,
                {
                    $set: {
                        price: newPrice,
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
                const allItems = await CartItemModel.find({ customerId: newCartItem.customerId });
                res.status(200).json({ items: allItems });
            }
        }
    } catch (error) {
        next(error);
    }
};

// List items
export const listItems = async (req, res, next) => {
    try {
        const items = await CartItemModel.find({ customerId: req.query.customerId });
        res.status(201).json({ items });
    } catch (error) {
        next(error);
    }
};



// Update cartItem 
export const updateCartItem = async (req, res, next) => {
    try {
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
            const allItems = await CartItemModel.find({ customerId: updatedCartItem.customerId });
            res.status(200).json({ items: allItems });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteCart = async (req, res, next) => {
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
    updateCartItem,
    deleteCart
}