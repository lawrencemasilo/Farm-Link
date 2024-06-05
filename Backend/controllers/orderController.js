// Logic for order-related operations
const Order = require('../models/orderModel');
const Crop = require('../models/cropModel')
const Farm = require('../models/farmModel')
const User = require('../models/userModel')
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

// Update the last date a farmer was visited
const updateLastVisited = async (userId) => {
    await User.findByIdAndUpdate(userId, { lastVisited: Date.now() });
};

// Update order status endpoint
const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'dispatched', 'received'];
    if (!validStatuses.includes(status)) {
        return next(new ErrorHandler('Invalid status update!', 400));
    }

    const order = await Order.findByIdAndUpdate(orderId).populate({
        path: 'crop',
        populate: {
            path: 'farm',
            populate: {
                path: 'user',
                model: 'User'
            }
        }
    });
    if (!order) {
        return next(new ErrorHandler('Order not found!', 404));
    }

    // Update the order status
    order.status = status;
    await order.save();

    // Update last visited date for the user is the status is dispatched
    if (status === 'dispatched') {
        const userId = order.crop.farm.user._id;
        await updateLastVisited(userId);
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

// GET all orders for the admin side
const getOrders = catchAsyncErrors(async (req, res, next) => {
    try{
        const orders = await Order.aggregate([
           {
            $lookup: {
                from: 'crops',
                localField: 'crop',
                foreignField: '_id',
                as: 'cropDetails'
            }
           },
           {$unwind: '$cropDetails'},
           {
            $lookup: {
                from: 'farms',
                localField: 'cropDetails.farm',
                foreignField: '_id',
                as: 'farmDetails'
            }
           },
           {$unwind: '$farmDetails'},
           {
            $lookup: {
                from: 'users',
                localField: 'farmDetails.user',
                foreignField: '_id',
                as: 'farmerDetails'
            }
           },
           {$unwind: '$farmerDetails'},
           {
             $project: {
                _id: 1,
                quantity: 1,
                dateIssued: '$createdAt',
                status: 1,
                'cropDetails.cropName': 1,
                'farmDetails.name': 1,
                'farmerDetails.name': 1
             }
           }
        ]);
    
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error(error);
    }  
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