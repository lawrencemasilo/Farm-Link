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
    required: false
  },
  location: {
    type: String,
    required: true
  },
  streetName: {
    type: String,
    required: false
  },
  houseNumber: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  farmSize: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Farm', farmSchema);