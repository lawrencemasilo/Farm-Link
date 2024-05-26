// Logic for delivery-related operations
const Delivery = require('../models/deliveryModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create a new delivery => /api/v1/delivery/new
const createDelivery = catchAsyncErrors(async (req, res, next) => {
    const { name, crop, quantity, address, date } = req.body;
    const delivery = await Delivery.create({
        user: req.user.id,
        name,
        crop,
        quantity,
        address,
        date
    });

    res.status(201).json({
        success: true,
        delivery
    });
});

// GET single delivery details => /api/v1/delivery/:id
const getDelivery = catchAsyncErrors(async (req, res, next) => {
    const delivery = await Delivery.findById(req.params.id).populate('crop');

    if (!delivery) {
        return next(new ErrorHandler('Delivery not found!', 404));
    }

    res.status(200).json({
        success: true,
        delivery
    });
});

// GET all deliveries for the logged in user
const getDeliveries = catchAsyncErrors(async (req, res, next) => {
    const deliveries = await Delivery.find({ user: req.user.id }).populate('crop');

    res.status(200).json({
        success: true,
        deliveries
    });
});

// Update a delivery => /api/v1/delivery/:id
const updateDelivery = catchAsyncErrors(async (req, res, next) => {
    let delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
        return next(new ErrorHandler('Delivery not found!', 404));
    }

    delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        delivery
    });
});

// Delete a delivery => /api/v1/delivery/:id
const deleteDelivery = catchAsyncErrors(async (req, res, next) => {
    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) {
        return next(new ErrorHandler('Delivery not found!', 404));
    }

    await delivery.remove();

    res.status(200).json({
        success: true,
        message: 'Delivery successfully deleted.'
    });
});

module.exports = {
    createDelivery,
    getDelivery,
    getDeliveries,
    updateDelivery,
    deleteDelivery
};