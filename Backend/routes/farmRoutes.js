// Map URL endpoints to controller functions.
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

// Import farm controller methods
const { createFarm, getFarm, getFarms, updateFarm, deleteFarm } = require('../controllers/farmController');

router.route('/farm').post(isAuthenticated, createFarm);
router.route('/farms').get(isAuthenticated, getFarms);
router.route('/farm/:id').get(isAuthenticated, getFarm);
router.route('/farm/:id').delete(isAuthenticated, deleteFarm);
router.route('/farm/:id').put(isAuthenticated, updateFarm);

module.exports = router;