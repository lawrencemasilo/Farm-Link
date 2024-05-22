// Logic for farm-related operations
const Farm = require('../models/farmModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create farm instance
const createFarm = catchAsyncErrors(async (req, res, next) => {
  const farm = await Farm.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Farm created successfully!',
    data: farm
  });
});

// Get farm instance by ID
const getFarm = catchAsyncErrors(async (req, res, next) => {
  const farm = await Farm.findById(req.params.id);

  if (!farm) {
    return next(new ErrorHandler('Farm not found!', 404));
  }

  res.status(200).json({
    success: true,
    data: farm
  });
});

// Get all farm instances : /api/v1/farm
const getFarms = catchAsyncErrors(async (req, res, next) => {
  const farms = await Farm.find();

  res.status(200).json({
    success: true,
    data: farms
  });
});

// Update farm details by ID
const updateFarm =  catchAsyncErrors(async (req, res, next) => {
  let farm = await Farm.findById(req.params.id);

  if (!farm) {
    return next(new ErrorHandler('Farm not found!', 404));
  }

  farm = await Farm.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    message: 'Farm details updated successfully!',
    data: farm
  });
});

// Delete farm instance by ID
const deleteFarm = catchAsyncErrors(async (req, res, next) => {
  const farm = await Farm.findById(req.params.id);

  if (!farm) {
    return next(new ErrorHandler('Farm not found', 404));
  }

  await farm.remove();

  res.status(200).json({
    success: true,
    message: 'Farm deleted successfully!'
  });
});

module.exports = {
    createFarm,
    getFarm,
    getFarms,
    updateFarm,
    deleteFarm
};