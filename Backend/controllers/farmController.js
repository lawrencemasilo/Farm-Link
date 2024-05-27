// Logic for farm-related operations
// const User = require('../models/userModel');

// const ErrorHandler = require('../utils/errorHandler');
// const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create farm instance
// const createFarm = catchAsyncErrors(async (req, res, next) => {
//   const farm = await Farm.create(req.body);

//   res.status(201).json({
//     success: true,
//     message: 'Farm details added successfully!',
//     data: farm
//   });
// });

// // Get farm instance by ID
// const getFarm = catchAsyncErrors(async (req, res, next) => {
//   const farm = await Farm.findById(req.params.id);

//   if (!farm) {
//     return next(new ErrorHandler('Farm not found!', 404));
//   }

//   res.status(200).json({
//     success: true,
//     data: farm
//   });
// });

// Get all farm instances : /api/v1/farm
// const getFarms = catchAsyncErrors(async (req, res, next) => {
//   const farms = await Farm.find();

//   res.status(200).json({
//     success: true,
//     data: farms
//   });
// });

// Update the current user's farm details
// const updateFarm =  catchAsyncErrors(async (req, res, next) => {
//   const { name, location, streetName, houseNumber, city, farmSize } = req.body;

//   const user = await User.findById(req.user._id);

//   if (!User.updateSearchIndex) {
//     return next(new ErrorHandler('Farm not found!', 404));
//   }

//   if (!user.farm) {
//     return next(new ErrorHandler('User does not have a farm!', 400));
//   }

//   user.farm = { ...user.farm, name, location, streetName, houseNumber, city, farmSize };
//   await user.save(); 

//   res.status(200).json({
//     success: true,
//     message: 'Farm details updated successfully!',
//     data: user
//   });
// });

// Delete farm instance by ID
// const deleteFarm = catchAsyncErrors(async (req, res, next) => {
//   const farm = await Farm.findById(req.params.id);

//   if (!farm) {
//     return next(new ErrorHandler('Farm not found', 404));
//   }

//   await farm.remove();

//   res.status(200).json({
//     success: true,
//     message: 'Farm deleted successfully!'
//   });
// });

// module.exports = {
//     createFarm,
    // getFarm,
    // getFarms,
    // updateFarm,
    // deleteFarm
// };