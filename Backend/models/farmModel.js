// Defines the user schema and related data methods
const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cropType: {
    type: String,
    required: true
  },
  farmSize: {
    type: Number,
    required: true
  },
  production: {
      type: Number,
      required: true
  }
});

module.exports = mongoose.model('Farm', farmSchema);