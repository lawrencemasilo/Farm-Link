const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizedRoles } = require('../middleware/authMiddleware');

// Importing user profile controller methods
const { 
  getUserProfile,
  updateUserPassword, 
  updateUserData, 
  deleteUser,
  getUsers 
} = require('../controllers/userProfileController');

router.route('/profile').get(isAuthenticated, getUserProfile);
router.route('/update/password').put(isAuthenticated, updateUserPassword);
router.route('/profile/update').put(isAuthenticated, updateUserData);
router.route('/profile/delete').delete(isAuthenticated, deleteUser);

// Admin only routes
router.route('/users').get(isAuthenticated, getUsers);

module.exports = router;