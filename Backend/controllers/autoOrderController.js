const Order = require('../models/orderModel');
const Crop = require('../models/cropModel');
const User = require('../models/userModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


// Calculating the total availability of a specific crop among all farmers
const calculateTotalAvailability = (farmers, cropName) => {
  let totalAvailability = 0;

  for (let farmer of farmers) {
    if (!farmer.farm) continue;
    for (let farmCrop of farmer.farm.crops) {
      if (farmCrop.cropName === cropName) {
        totalAvailability += farmCrop.availability;
      }
    }
  }
  return totalAvailability;
};

const createAutoOrder = catchAsyncErrors(async (req, res, next) => {
  const admin = req.user._id;
  const { crops } = req.body;
  let orders = [];
  let unfulfilled = [];

  for (const {crop: cropName, quantity} of crops) {
    const crop = await Crop.findOne({ cropName });
    if (!crop) {
      return next(new ErrorHandler(`Crop with name ${cropName} not found`, 404));
    }

    // Find farmers who have this crop available and sort by last visited date
    const farmers = await User.find({ role: 'user', farm: { $exists: true } })
      .populate({
        path: 'farm',
        populate: {
          path: 'crops',
        }
      })
      .sort({ lastVisited: 1 });
    
    const totalAvailability = calculateTotalAvailability(farmers, cropName);

    // Check if there is enough total availability for this crop
    if (totalAvailability < quantity) {
      unfulfilled.push({ crop: crop.cropName, shortfall: quantity - totalAvailability });
      continue;
    }

    // Distribute the order quantity among farmers
    let remainingQuantity = quantity;

    for (let farmer of farmers) {
      if (!farmer.farm) continue;

      for (let farmCrop of farmer.farm.crops) {
        if (farmCrop.cropName == cropName && farmCrop.availability > 0) {
          const assignedQuantity = Math.min(remainingQuantity, farmCrop.availability);
          farmCrop.availability -= assignedQuantity;
          remainingQuantity -= assignedQuantity;

          await farmCrop.save();

          // Create the order for this farmer
          const newOrder = await Order.create({
              admin,
              farmer: farmer._id,
              crop: farmCrop._id,
              quantity: assignedQuantity,
          });

          orders.push(newOrder);

          // Add the order to the crop's orders array
          crop.orders.push(newOrder);
          await crop.save();

          if (remainingQuantity <= 0) break;
        }
      }
      if (remainingQuantity <= 0) break;
    }
  }

  res.status(201).json({
    success: true,
    orders,
    unfulfilled
  });
});

module.exports = {
  createAutoOrder
}