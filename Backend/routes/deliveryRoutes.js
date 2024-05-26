// Maps URL endpoints to controller functions.
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

// Importing delivery controller methods
const { createDelivery, getDelivery, getDeliveries, updateDelivery, deleteDelivery } = require('../controllers/deliveryController');

router.route('/delivery').post(isAuthenticated, createDelivery);
router.route('/deliveries').get(isAuthenticated, getDeliveries);
router.route('/delivery/:id').get(isAuthenticated, getDelivery);
router.route('/delivery/:id').put(isAuthenticated, updateDelivery);
router.route('/delivery/:id').delete(isAuthenticated, deleteDelivery);

module.exports = router;