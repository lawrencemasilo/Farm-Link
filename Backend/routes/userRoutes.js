// Maps URL endpoints to controller functions.
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

// Importing crop controller methods
const { addCrop, updateCrop, getCrop } = require('../controllers/cropController');

router.route('/crop').post(addCrop);
router.route('/crop/:id').put(updateCrop);
router.route('/crop/:id').get(getCrop);

// Importing user controller methods
const { registerUser, userLogin, forgotPassword, passwordReset, userLogout } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/forgot/password').post(forgotPassword);
router.route('/password/reset/:token').put(passwordReset);
router.route('/logout').get(isAuthenticated, userLogout);


module.exports = router;