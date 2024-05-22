const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if(process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success : false,
      error : err,
      errMessage : err.message,
      stack : err.stack
    });
  }

  if (process.env.NODE_ENV === 'production') {
    let error = {...err};
    error.message = err.message;
    // Handle duplicates in database
    if (err.code === 11000) {
      const message = `User with email: ${Object.keys(err.keyValue)} already exist`;
      error = new ErrorHandler(message, 400);
    }

    // Handle Invalid JWT error
    if (err.name === 'JsonWebTokenError') {
      const message = 'JSON Web token is invalid. Try Again';
      error = new ErrorHandler(message, 500);
    }

    // Handle expired JWT error
    if (err.name === 'TokenExpiredError') {
      const message = 'Your session has expired. Login Again';
      error = new ErrorHandler(message, 500);
    }

    
    res.status(err.statusCode).json({
      success : false,
      message : error.message || 'Internal Server Error'
    });
  }
}