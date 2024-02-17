const { Schema, models, model } = require('mongoose');

const OrderSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: {
            values: ['paid', 'confirmed', 'shipped', 'recieved', 'returned', 'complaint'],
            message: '{VALUE} is not a valid status'
        },
        default: 'paid'
    },
    paidOn: {
        type: Date,
        required: true,
        default: new Date()
    },
    confirmedOn: {
        type: Date,
        required: false,
    },
    shippedOn: {
        type: Date,
        required: false,
    },
    recievedOn: {
        type: Date,
        required: false,
    },    
    returnedOn: {
        type: Date,
        required: false,
    },
    complainedOn: {
        type: Date,
        required: false,
    },
    complaintTitle: {
        type: String,
        required: false,
    },
    complaintDescription: {
        type: String,
        required: false,
    },
    paidOn: {
        type: Date,
        required: false,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});

const CartItemModel = model('order', OrderSchema);

module.exports = CartItemModel;