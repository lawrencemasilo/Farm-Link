// Maps URL endpoints to controller functions.
const express = require('express');
const router = express.Router();
const {cookieJwtAuth, authorizedRoles } = require('../middleware/crackCookie');

// Importing delivery controller methods
const { createDelivery, getDelivery, getDeliveries, updateDelivery, deleteDelivery } = require('../controllers/deliveryController');

router.route('/delivery').post(cookieJwtAuth, createDelivery);
router.route('/deliveries').get(cookieJwtAuth, getDeliveries);
router.route('/delivery/:id').get(cookieJwtAuth, getDelivery);
router.route('/delivery/:id').put(cookieJwtAuth, updateDelivery);
router.route('/delivery/:id').delete(cookieJwtAuth, deleteDelivery);

module.exports = router;