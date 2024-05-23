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
    yield: {
        type: Number,
        required: true
    },
    plotSize: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Crop', cropSchema);