// Defines the user schema and related data methods
const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  streetName: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  farmSize: {
    type: Number,
    required: true
  },
  crops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    default: []
  }],

});

module.exports = mongoose.model('Farm', farmSchema);