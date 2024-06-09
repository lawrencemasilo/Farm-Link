// Automated orders-related functions and logic
const User = require('../models/userModel');
const Farm = require('../models/farmModel');
const Order = require('../models/orderModel');
const sendNotification = require('../services/notificationService');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// Endpoint to send notification to all farmers with active orders
const sendOrderNotications = catchAsyncErrors(async (req, res, next) => {
    // Let's get all active orders first
    const orders = await Order.find({ status: 'active' }).populate({
        path: 'farm',
        populate: {
            path: 'user'
        }
    });

    if (!orders || orders.length === 0)
        return next(new ErrorHandler('No active orders found', 404));

    // collect farmer tokens and prepare messages
    const farmerTokens = [];
    const notificationPromises = [];

    orders.forEach(order => {
        const farmer = order.farm?.user;
        if (farmer && farmer.fcmToken) {
            const message = `You have an active order from ${order.user.name}. Please view your dashboard for more details.`;
            farmerTokens.push(farmer.fcmToken);
            notificationPromises.push(sendNotification([farmer.fcmToken], message));
        }
    });

    // Send notifications
    await Promise.all(notificationPromises);

    res.status(200).json({
        success: true,
        message: 'Notifications sent successfully'
    });
});

module.exports = {
    sendOrderNotications
};