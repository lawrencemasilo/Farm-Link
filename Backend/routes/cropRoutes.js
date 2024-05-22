// Map URL endpoints to controller functions
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

// Import crop controller methods
const { addCrop, updateCrop, getCrop } = require('../controllers/cropController');

router.route('/crop').post(addCrop);
router.route('/crop/:id').put(updateCrop);
router.route('/crop/:id').get(getCrop);

module.exports = router;