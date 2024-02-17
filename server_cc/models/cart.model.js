const { Schema, models, model } = require('mongoose');

const CartItemSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['pending', 'accepted', 'complete', 'shipped', 'rejected'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    },
    completedOn: {
        type: Date,
        required: false
    },
    orderId: {
        type: String,
        required: false
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

const CartItemModel = model('cart', CartItemSchema);

module.exports = CartItemModel;