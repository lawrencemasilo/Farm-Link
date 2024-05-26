// Defines the delivery schema and related data methods
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    crop: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Crop'
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Delivery', deliverySchema);