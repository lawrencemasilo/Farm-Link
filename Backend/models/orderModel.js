// Defines the order schema and related data methods
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Crop'
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);