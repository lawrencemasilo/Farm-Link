// Maps URL endpoints to controller functions.
const express = require('express');
const router = express.Router();
const {cookieJwtAuth, authorizedRoles } = require('../middleware/crackCookie');

// Importing user controller methods
const { registerUser, userLogin, updateFcmToken, forgotPassword, passwordReset, userLogout } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/fcmToken').put(cookieJwtAuth, updateFcmToken);
router.route('/forgot/password').post(forgotPassword);
router.route('/password/reset/:token').put(passwordReset);
router.route('/logout').get(cookieJwtAuth, userLogout);


module.exports = router;