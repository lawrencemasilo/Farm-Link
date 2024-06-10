const express = require('express');
// Importing route planner controller methods
const { getPlan } = require('../controllers/routePlannerController');
const {cookieJwtAuth, authorizedRoles } = require('../middleware/crackCookie');
const router = express.Router();

router.use(cookieJwtAuth);

router.route('/plan').post(authorizedRoles('admin', 'driver'), getPlan);

module.exports = router;