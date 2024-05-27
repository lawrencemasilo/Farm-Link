// Logic for crop-related operations
// const User = require('../models/userModel');
// const Farm = require('../models/farmModel');
// const ErrorHandler = require('../utils/errorHandler');
// const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// // Allow user to add a new crop
// const addCrop = catchAsyncErrors(async (req, res, next) => {
//     const { cropName, plantDate, harvestDate, yield, plotSize } = req.body;

//     const user = await User.findById(req.user._id);
//     if (!user) {
//         return next(new ErrorHandler('User not found', 404));
//     }

//     if (!user.farm) {
//         return next(new ErrorHandler('User does not have a farm', 400));
//     }

//     // Check if all required fields are provided
//     if (!cropName || !plantDate || !harvestDate || !yield || !plotSize) {
//         return next(new ErrorHandler('Please fill in all the required fields', 400));
//     }

//     // Create a new crop document
//     user.farm.crops.push({ cropName, plantDate, harvestDate, yield, plotSize });
//     await user.save();

//     // Send response with the new crop details
//     res.status(201).json({
//         success: true,
//         data: user,
//         message: 'Crop was successfuly added!'
//     });
// });

// //  Update crop details in the current user's farm
// const updateCrop = catchAsyncErrors(async (req, res, next) => {
//     const cropId = req.params.cropId;
//     const { cropName, plantDate, harvestDate, produceYield, plotSize } = req.body;

//     const user = await User.findById(req.user._id);
//     if (!user) {
//         return next(new ErrorHandler('User not found', 404));
//     }

//     if (!user.farm) {
//         return next(new ErrorHandler('User does not have a farm', 400));
//     }

//     // Check if the crop exists
//     const crop = user.farm.crops.id(cropId);
//     if (!crop) {
//         return next(new ErrorHandler('Crop not found', 404));
//     }

//     crop.cropName = cropName || crop.cropName;
//     crop.plantDate = plantDate || crop.plantDate;
//     crop.harvestDate = harvestDate || crop.harvestDate;
//     crop.produceYield = produceYield || crop.produceYield;
//     crop.plotSize = plotSize || crop.plotSize;

//     await user.save();

//     // Send response with the updated crop details
//     res.status(200).json({
//         success: true,
//         data: user,
//         message: 'Crop was successfuly updated!'
//     });
// });

// Allow user to retrieve crop instance
// const getCrop = catchAsyncErrors(async (req, res, next) => {
//     const crop = await Crop.findById(req.params.id).populate('farm');

//     // Check if the crop exists
//     if (!crop) {
//         return next(new ErrorHandler('Crop not found', 404));
//     }

//     // Send response with the crop details
//     res.status(200).json({
//         success: true,
//         data: crop
//     });
// });

// Allow user to retrieve all crop instances
// const getCrops = catchAsyncErrors(async (req, res, next) => {
//     const crops = await Crop.find().populate('farm');

//     res.status(200).json({
//         success: true,
//         data: crops
//     });
// });

// module.exports = { addCrop, updateCrop, getCrop, getCrops };