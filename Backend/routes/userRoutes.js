// Maps URL endpoints to controller functions.
const express = require('express');
const router = express.Router();

// Imporying user controller methods
const { registerUser, userLogin } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);

module.exports = router;