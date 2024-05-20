// Defines the crop schema and related data methods
const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    cropName: {
        type: String,
        ref: 'Crop',
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
    yield: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Crop', cropSchema);