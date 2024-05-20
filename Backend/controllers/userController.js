// Logic for user-related operations

const User = require('../models/userModel');
const Farm = require('../models/farmModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Register a new user along with their farm details
const registerUser =  catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, address, cropType, farmSize, production } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !address || !cropType || !farmSize || !production) {
    return next(new ErrorHandler('Please fill in all the required fields', 400));
  }

  // Create user and farm documents within the same session
  const user = await User.create({ name, email, password });
  const farm = await Farm.create({ user: user._id, address, farmSize, cropType, production});

  // Associate farm with the user and save changes
  user.farms.push(farm._id);
  await user.save();

  // Create a json web token
  const token = user.getJwtToken();

  // Send response with reqistered user and farm details
  res.status(201).json({
    success: true,
    token : token,
    message: 'User was successfuly registered'
  }) ;
});

// Login a registered user
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if all required fields are provided
  if ( !email || !password ) {
    return next(new ErrorHandler('Please enter both email and password', 400));
  }

  // Find the related user from the database
  const user = await User.findOne({email}).select('+password');

  // Check is the provided email exists
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  // Check if the provided password corresponds with password in database
  const isPasswordCorrect = await user.comparePassword(password);

  // Check is the password entered is correct
  if (!isPasswordCorrect) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  
  // Create a json web token
  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token : token,
    message: 'User successfuly logged in'
  })
    
})

module.exports = {
  registerUser,
  userLogin,
};