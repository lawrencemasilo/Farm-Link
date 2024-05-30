// Defines the crop schema and related data methods
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    farm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },
    cropName: {
        type: String,
        required: true
    },
    plantDate: {
        type: Date,
        required: true
    },
    harvestDate: {
        type: Date,
        required: true
    },
    produceYield: {
        type: Number,
        required: true
    },
    availability: {
        type: Number,
        required: true
    },
    plotSize: {
        type: Number,
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: []
    }]
});

module.exports = mongoose.model('Crop', cropSchema);