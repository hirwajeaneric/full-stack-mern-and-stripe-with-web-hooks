const {Schema, model} = require('mongoose');

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
        required: false,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['pending','complete','returned','rejected','accepted'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    },   
    completedOn: {
        type: Date,
        required: false
    },
    orderCode: {
        type: String,
        required: false
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const CartItemModel = model('Cart', CartItemSchema); //

module.exports = CartItemModel;