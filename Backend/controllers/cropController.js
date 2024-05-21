// Logic for crop-related operations
const Crop = require('../models/cropModel');
const Farm = require('../models/farmModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Allow user to add a new crop
const addCrop = catchAsyncErrors(async (req, res, next) => {
    const { cropName, farm, plantDate, harvestDate, yield } = req.body;

    // Check if all required fields are provided
    if (!cropName || !farm || !plantDate || !harvestDate || !yield) {
        return next(new ErrorHandler('Please fill in all the required fields', 400));
    }

    // Create a new crop document
    const crop = await Crop.create({ cropName, farm, plantDate, harvestDate, yield });

    // Send response with the new crop details
    res.status(201).json({
        success: true,
        data: crop,
        message: 'Crop was successfuly added!'
    });
});

// Allow user to update crop details
const updateCrop = catchAsyncErrors(async (req, res, next) => {
    let crop = await Crop.findById(req.params.id);

    // Check if the crop exists
    if (!crop) {
        return next(new ErrorHandler('Crop not found', 404));
    }

    // Update the crop details
    crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    // Send response with the updated crop details
    res.status(200).json({
        success: true,
        data: crop,
        message: 'Crop was successfuly updated!'
    });
});

// Allow user to retrieve crop instance
const getCrop = catchAsyncErrors(async (req, res, next) => {
    const crop = await Crop.findById(req.params.id).populate('farm');

    // Check if the crop exists
    if (!crop) {
        return next(new ErrorHandler('Crop not found', 404));
    }

    // Send response with the crop details
    res.status(200).json({
        success: true,
        data: crop
    });
});

module.exports = { addCrop, updateCrop, getCrop };