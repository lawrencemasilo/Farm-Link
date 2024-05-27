// Maps URL endpoints to controller functions.
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

// Importing order controller methods
const { createOrder, getOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

router.route('/order').post(isAuthenticated, createOrder);
router.route('/orders').get(isAuthenticated, getOrders);
router.route('/order/:id').get(isAuthenticated, getOrder);
router.route('/order/:id').put(isAuthenticated, updateOrder);
router.route('/order/:id').delete(isAuthenticated, deleteOrder);

module.exports = router;