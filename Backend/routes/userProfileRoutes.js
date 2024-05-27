const express = require('express');
// Importing user profile controller methods
const { 
  getUserProfile, updateUserPassword, updateUserData, deleteUser, createFarm,
  updateFarm, addCrop, updateCrop, getUserFarmAndCrops, getUsers, getUserDetails
} = require('../controllers/userProfileController');
const { isAuthenticated, authorizedRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(isAuthenticated)

router.route('/profile').get(getUserProfile);
router.route('/update/password').put(updateUserPassword);
router.route('/profile/update').put(updateUserData);
router.route('/profile/delete').delete(deleteUser);

router.route('/profile/farm').post(createFarm);
router.route('/profile/farm').put(updateFarm);
router.route('/profile/farm/crops').post(addCrop);
router.route('/profile/farm/crops/:cropId').put(updateCrop);
router.route('/profile/farm').get(getUserFarmAndCrops);

// Admin only routes
router.route('/users').get(getUsers);
router.route('/users/:userId').get(getUserDetails);


module.exports = router;