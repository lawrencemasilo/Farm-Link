const express = require('express');
const { createAutoOrder } = require('../controllers/autoOrderController');
const {cookieJwtAuth, authorizedRoles } = require('../middleware/crackCookie');
const router = express.Router();

router.use(cookieJwtAuth);

// Admin only routes
router.route('/orders/auto').post(authorizedRoles('admin'), createAutoOrder);

module.exports = router;