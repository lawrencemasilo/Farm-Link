const User = require('../models/userModel');
const Farm = require('../models/farmModel');
const Crop = require('../models/cropModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/generateToken');
const FarmLinkFilters = require('../utils/apiFilters');
const { populate } = require('../models/orderModel');

// Get detailes of the currently logged in user: /api/v1/profile
const getUserProfile =  catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

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


// Create farm instance
const createFarm = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const { name, location, streetName, houseNumber, city, farmSize } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler('User not found!', 404));
  }

  if (user.farm) {
    return next(new ErrorHandler('User already has a farm!', 400));
  }

  const farm = new Farm({user: user._id, name, location, streetName, houseNumber, city, farmSize});
  await farm.save();

  user.farm = farm._id;
  await user.save();

  res.status(200).json({
    success: true,
    data: farm
  });
});


// Update farm details
const updateFarm = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const { name, location, streetName, houseNumber, city, farmSize } = req.body;

  // find the user and populate the farm fields
  const user = await User.findById(userId).populate('farm');
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  if (!user.farm) {
      return next(new ErrorHandler('User does not have a farm', 400));
  }

  // Update the farm document
  const farm = await Farm.findByIdAndUpdate(
    user.farm._id,
    { name, location, streetName, houseNumber, city, farmSize },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: farm
  });
});

const addCrop = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const { cropName, plantDate, harvestDate, availability, produceYield, plotSize } = req.body;

  const user = await User.findById(userId).populate('farm');
  if (!user) {
      return next(new ErrorHandler('User not found', 404));
  }

  if (!user.farm) {
      return next(new ErrorHandler('User does not have a farm', 400));
  }

  const farm = await Farm.findById(user.farm);
  if (!farm) {
    return next(new ErrorHandler('Farm not found', 404));
  }

  // Check if all required fields are provided
  if (!cropName || !plantDate || !harvestDate || !availability || !produceYield || !plotSize) {
      return next(new ErrorHandler('Please fill in all the required fields', 400));
  }

  // check for existing crop to avoid duplicates
  const existingCrop = await Crop.findOne({ farm: farm._id, cropName, plantDate, harvestDate, produceYield, availability, plotSize });
  if (existingCrop) {
    return next(new ErrorHandler('Crop already exists', 400));
  }

  // Create a new crop document
  const crop = await Crop.create({ farm: farm._id, cropName, plantDate, harvestDate, produceYield, availability, plotSize });
  
  // Add the crop's ObjectId to the farm's crop array
  farm.crops.push(crop._id);
  await farm.save();

  // Send response with the new crop details
  res.status(201).json({
      success: true,
      data: crop,
      message: 'Crop was successfuly added!'
  });
});

// Retrieve crops of the currently logged in user
const getCrops = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId).populate({
    path: 'farm',
    populate: {
      path: 'crops'
    }
  });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  if (!user.farm) {
    return next(new ErrorHandler('User does not have a farm', 400));
  }

  const crops = user.farm.crops;

  res.status(200).json({
    success: true,
    data: crops
  });

});

//  Update crop details in the current user's farm
const updateCrop = catchAsyncErrors(async (req, res, next) => {
  const cropId = req.params.cropId;
  const { cropName, plantDate, harvestDate, produceYield, availability, plotSize } = req.body;

  const user = await User.findById(req.user.id).populate({
    path: 'farm',
    populate: {
      path: 'crops'
    }
  });

  if (!user) {
      return next(new ErrorHandler('User not found', 404));
  }

  if (!user.farm) {
      return next(new ErrorHandler('User does not have a farm', 400));
  }

  // Check if the crop exists
  const crop = user.farm.crops.find(crop => crop._id.toString() === cropId);
  if (!crop) {
      return next(new ErrorHandler('Crop not found', 404));
  }

  crop.cropName = cropName || crop.cropName;
  crop.plantDate = plantDate || crop.plantDate;
  crop.harvestDate = harvestDate || crop.harvestDate;
  crop.produceYield = produceYield || crop.produceYield;
  crop.plotSize = plotSize || crop.plotSize;
  crop.availability = availability ||  crop.availability;
  
  await user.farm.save();

  // Send response with the updated crop details
  res.status(200).json({
      success: true,
      data: user,
      message: 'Crop was successfuly updated!'
  });
});

const getUserFarmAndCrops = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId).populate({
    path: 'farm',
    populate: {
      path: 'crops',
      populate: {
        path: 'orders'
      }
    }
  });

  if (!user || !user.farm) {
    return next(new ErrorHandler('Farm not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user.farm,
});

});

// Admin only methods
// Show all users : /api/v1/users
const getUsers =  catchAsyncErrors(async (req, res, next) => {
  const appFilters = new FarmLinkFilters(User.find(), req.query)
      .filter()
      .searchByQuery()
      .sort()
      .limitFields()
      .pagination();

  const users = await appFilters.query
    .populate({
      path: 'farm',
      populate: {
        path: 'crops'
      }
    });

  res.status(200).json({
    success : true,
    results : users.length,
    data : users
  });
});

// Show details of the selected user
const getUserDetails =  catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId;

  // Find the user by ID and populate farm and crop details
  const user = await User.findById(userId)
    .populate({
      path: 'farm',
      populate: {
        path: 'crops'
      }
    });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  res.status(200).json({
    success : true,
    data : user
  });
});

// Deletes user, farm and associated crops
const adminDeleteUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId).populate('farm');
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  if (user.farm) {
    const farmId = user.farm._id;

    await Crop.deleteMany({ farm: farmId });
    await Farm.findByIdAndDelete(farmId);
  }

  await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: 'User, farm, and crops were successfully delete'
  });
});

module.exports = {
  getUserProfile,
  updateUserPassword,
  updateUserData,
  deleteUser,
  createFarm,
  updateFarm,
  addCrop,
  getCrops,
  updateCrop,
  getUserFarmAndCrops,
  getUsers,
  getUserDetails,
  adminDeleteUser
}