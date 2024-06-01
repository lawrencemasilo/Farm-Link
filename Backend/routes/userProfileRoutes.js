const express = require('express');
// Importing user profile controller methods
const { 
  getUserProfile, updateUserPassword, updateUserData, deleteUser, createFarm,
  updateFarm, addCrop, getCrops, updateCrop, getUserFarmAndCrops, getUsers, getUserDetails,
  adminDeleteUser
} = require('../controllers/userProfileController');
const {cookieJwtAuth, authorizedRoles } = require('../middleware/crackCookie');
const router = express.Router();

router.use(cookieJwtAuth);

router.route('/profile').get(getUserProfile);
router.route('/update/password').put(updateUserPassword);
router.route('/profile/update').put(updateUserData);
router.route('/profile/delete').delete(deleteUser);

router.route('/profile/farm').post(createFarm).put(updateFarm).get(getUserFarmAndCrops);
router.route('/profile/farm/crops').post(addCrop).get(getCrops);
router.route('/profile/farm/crops/:cropId').put(updateCrop);

// Admin only routes
router.route('/users').get(authorizedRoles('admin'), getUsers);
router.route('/users/:userId').get(authorizedRoles('admin'), getUserDetails);
router.route('/users/:userId').delete(authorizedRoles('admin'), adminDeleteUser);


module.exports = router;