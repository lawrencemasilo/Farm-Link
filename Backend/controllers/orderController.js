// Logic for order-related operations
const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create a new order => /api/v1/order
const createOrder = catchAsyncErrors(async (req, res, next) => {
    const { name, crop, quantity } = req.body;
    const order = await Order.create({
        user: req.user.id,
        name,
        crop,
        quantity
    });

    res.status(201).json({
        success: true,
        order
    });
});

// GET single order details => /api/v1/order/:id
const getOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('crop');

    if (!order) {
        return next(new ErrorHandler('Order not found!', 404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// GET all orders for the logged in user
const getOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id }).populate('crop');

    res.status(200).json({
        success: true,
        orders
    });
});

// Update an order => /api/v1/order/:id
const updateOrder = catchAsyncErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('Order not found!', 404));
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        order
    });
});

// Delete an order => /api/v1/order/:id
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler('Order not found!', 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
        message: 'Order deleted successfully!'
    });
});

module.exports = {
    createOrder,
    getOrder,
    getOrders,
    updateOrder,
    deleteOrder
};