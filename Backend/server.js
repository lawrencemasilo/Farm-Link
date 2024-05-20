const cors = require('cors');
const express = require('express');
const app = express()

const dotenv =require('dotenv');
const errorMiddleware = require('./middleware/errors');
const ErrorHandler = require('./utils/errorHandler');
const connectDB = require('./config/db');

// Setting up .env file variables
dotenv.config();

// Connect to database
connectDB();

// Setup body parser
app.use(express.json());
app.use(cors());

// Handling Uncaught Exception
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
}) 

// The routes start here
// Import all routes
const auth = require('./routes/userRoutes');


app.use('/api/v1', auth);



// The routes end here

// Handling unhandled routes
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handling Unhandled Prommise Rejection
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejection');
  server.close( () => {
    process.exit(1);
  })
}); 