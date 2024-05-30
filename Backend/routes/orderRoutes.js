// Maps URL endpoints to controller functions.
const express = require('express');
const router = express.Router();
const {cookieJwtAuth, authorizedRoles } = require('../middleware/crackCookie');

// Importing order controller methods
const { createOrder, getOrder, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

router.route('/order').post(cookieJwtAuth, authorizedRoles('admin'), createOrder);
router.route('/orders').get(cookieJwtAuth, getOrders);
router.route('/order/:id').get(cookieJwtAuth, getOrder);
router.route('/order/:id').put(cookieJwtAuth, authorizedRoles('admin'), updateOrder);
router.route('/order/:id').delete(cookieJwtAuth, authorizedRoles('admin'), deleteOrder);

module.exports = router;