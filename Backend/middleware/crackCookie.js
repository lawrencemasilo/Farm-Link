const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');

const cookieJwtAuth = catchAsyncErrors(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new ErrorHandler('Unauthorized: Token missing', 401));
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    throw new ErrorHandler('Forbidden: Invalid token', 403);
  }
  
});

module.exports = cookieJwtAuth;