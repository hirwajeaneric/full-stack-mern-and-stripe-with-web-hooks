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
        required: true,
        default: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png'
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
    orderCode: {
        type: String,
        required: false,
        unique: true,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
});

const CartItemModel = model('Cart', CartItemSchema); //

module.exports = CartItemModel;