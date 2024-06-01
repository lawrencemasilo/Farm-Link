// Logic for order-related operations
const Order = require('../models/orderModel');
const Crop = require('../models/cropModel')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create a new order => /api/v1/order
const createOrder = catchAsyncErrors(async (req, res, next) => {
    const { cropId, quantity } = req.body;
    const adminId = req.user._id;

    const crop = await Crop.findById(cropId);
    if (!crop) {
        return next(new ErrorHandler('Crop not found!', 404));
    }

    const order = new Order({
        admin: adminId,
        crop:cropId,
        quantity
    });

    await order.save();

    // Add order to crop
    crop.orders.push(order._id);
    await crop.save();

    res.status(201).json({
        success: true,
        order
    });
});

// Update order status endpoint
const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
        return next(new ErrorHandler('Order not found!', 404));
    }

    res.status(200).json(order);
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

    await order.deleteOne();

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
    deleteOrder,
    updateOrderStatus
};