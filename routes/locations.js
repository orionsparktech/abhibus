const express = require('express');
const router = express.Router();
const LocationController = require('../controllers/locationController');
const verifyToken = require('../utils/Verify');

router.post('/add', verifyToken, LocationController.addLocation);
router.get('/', verifyToken, LocationController.getAllLocations);

module.exports = router;
