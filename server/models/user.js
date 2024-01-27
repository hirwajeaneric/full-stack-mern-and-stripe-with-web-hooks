const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ['admin', 'client'],
            message: '{VALUE} is not a valid role'
        },
        default: 'client'
    }
}, {
    timestamps: true
});

const User = model('User', userSchema);

module.exports = User;