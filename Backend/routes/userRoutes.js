// Maps URL endpoints to controller functions.
const express = require('express');
const router = express.Router();

// Imporying user controller methods
const { registerUser, userLogin } = require('../controllers/userController');
// Importing crop controller methods
const { addCrop, updateCrop, getCrop } = require('../controllers/cropController');

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/crop').post(addCrop);
router.route('/crop/:id').put(updateCrop);
router.route('/crop/:id').get(getCrop);

module.exports = router;