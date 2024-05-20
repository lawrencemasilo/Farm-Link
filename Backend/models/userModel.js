// Defines the user schema and related data methods
const mongoose = require('mongoose');
const { reset } = require('nodemon');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  farms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm'
}]
});

// Encrypting passwords before saving them
userSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
});

// Function that returns a JSON WEB TOKEN
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id : this._id }, process.env.JWT_SECRET, {
    expiresIn : process.env.JWT_EXPIRY_TIME
  });
}

// Compare the entered password with the password stored in database
userSchema.methods.comparePassword = async function(providedPassword) {
  return await bcrypt.compare(providedPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);