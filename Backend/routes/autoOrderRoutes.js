// Maps URL endpoint to controller functions.
const express = require('express');
const router = express.Router();
const {cookieJwtAuth, authorizedRoles } = require('../middleware/crackCookie');

// Importing autoOrder controller method
const { sendOrderNotications } = require('../controllers/autoOrderController');

router.route('/sendOrderNotifications').post(cookieJwtAuth, authorizedRoles('admin'), sendOrderNotications);

module.exports = router;