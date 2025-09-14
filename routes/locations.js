const express = require('express');
const router = express.Router();
const LocationController = require('../controllers/locationController');

router.post('/add', LocationController.addLocation);
router.get('/', LocationController.getAllLocations);

module.exports = router;
