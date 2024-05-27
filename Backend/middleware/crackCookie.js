const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');

exports.cookieJwtAuth = catchAsyncErrors(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new ErrorHandler('Unauthorized: Token missing', 401));
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return next(new ErrorHandler('User not found', 404));
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ErrorHandler('Forbidden: Invalid token', 403);
  }
  
});

// Deals with permissions to resources
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorHandler(` No ${req.user.role} is allowed to access this resource`, 403));
    }
    next()
  }
}