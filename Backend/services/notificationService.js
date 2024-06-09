// Function to send notification to user
const messaging = require('../firebase');
const User = require('../models/userModel');

const sendNotification = async (token, message) => {
    const payload = {
        notification: {
            title: 'Active Order Notification',
            body: message
        }
    };

    try {
        const response = await messaging.sendNotification(token, payload);
        console.log('Notification sent successfully:', response);
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

module.exports = sendNotification;