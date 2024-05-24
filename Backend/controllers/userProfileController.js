const User = require('../models/userModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/generateToken');
const FarmLinkFilters = require('../utils/apiFilters')

// Get detailes of the currently logged in user: /api/v1/profile
const getUserProfile =  catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('farms');

  res.status(200).json({
    success: true,
    data: user
  })
});

// Update user password: /api/v1/update/password
const updateUserPassword =  catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check old user password 
  const isMatched = await user.comparePassword(req.body.currentPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Current password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Update user data: /api/v1/profile/update
const updateUserData =  catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify : false
  });

  res.status(200).json({
    success : true,
    data : user
  });
});

// Delete current user: /api/v1/profile/delete
const deleteUser =  catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  res.cookie('token', 'none', {
    expires : new Date(Date.now()),
    httpOnly : true
  })

  res.status(200).json({
    success : true,
    message : 'Account deleted successfully'
  })
});

// Admin only methods
// Show all users : /api/v1/users
const getUsers =  catchAsyncErrors(async (req, res, next) => {
  const appFilters = new FarmLinkFilters(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();

  const users = await appFilters.query;

  res.status(200).json({
    success : true,
    results : users.length,
    data : users
  })
});

module.exports = {
  getUserProfile,
  updateUserPassword,
  updateUserData,
  deleteUser,
  getUsers
}