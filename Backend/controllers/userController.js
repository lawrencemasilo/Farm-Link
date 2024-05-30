// Logic for user-related operations
const Farm = require('../models/farmModel');
const User = require('../models/userModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Register a new user along with their farm details : /api/v1/register
const registerUser =  catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  // Check if all required fields are provided
  if (!name || !email || !password || !phone) {
    return next(new ErrorHandler('Please fill in all the required fields', 400));
  }

  // Create user and farm documents within the same session
  const user = await User.create({ name, email, password, phone });
  // const farm = await Farm.create({ user: user._id, location, farmSize });

  // Associate farm with the user and save changes
  // await farm.save();
  await user.save();

  // Send response with reqistered user and farm details
  res.status(201).json({
    success: true,
    message: 'User was successfuly registered'
  }) ;
});

// Login a registered user : : /api/v1/login
const userLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if all required fields are provided
  if ( !email || !password ) {
    return res.status(400).json({ message: 'Please enter both email and password' });
  }

  // Find the related user from the database
  const user = await User.findOne({email}).select('+password');

  // Check is the provided email exists
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check if the provided password corresponds with password in database
  const isPasswordCorrect = await user.comparePassword(password);

  // Check is the password entered is correct
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  
  // Create a json web token
  sendToken(user, 200, res);

})

// Forgot Password : /api/v1/forgot/password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Find the related user from the database
  const user = await User.findOne({email: req.body.email});

  // Check is the provided email exists
  if (!user) {
    return next(new ErrorHandler('No user found with this email', 404));
  }

  // Get password reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave : false });

  // Create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

  const message = `Use the link below to reset your password:\n\n${resetUrl}\n\n Ignore this email if you did not request password reset.`
  
  try {
    await sendEmail({
      email : user.email,
      subject : 'Farm_Link Password recovery',
      message
    });
  
    res.status(200).json({
      success : true,
      message: `Email sent successfully to: ${user.email}`
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave : false });
    return next(new ErrorHandler('Email not sent'), 500);
  }
  
})

// Password reset: /api/v1/password/reset/:token
const passwordReset = catchAsyncErrors(async (req, res, next) => {
  // Hash the token from the url
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({resetPasswordToken, resetPasswordExpire: {$gt : Date.now()}});

  // Check is the provided email exists
  if (!user) {
    return next(new ErrorHandler('Password reset token is invalid or expired', 400));
  }

  // Create new password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  
  await user.save();

  sendToken(user, 200, res);
})

// Logout user: /api/v1/logout
const userLogout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now()),
    httpOnly : true
  })

  res.status(200).json({
    success: true,
    message : 'Logged out successfully'
  })
});

module.exports = {
  registerUser,
  userLogin,
  forgotPassword,
  passwordReset,
  userLogout
};