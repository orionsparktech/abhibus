const express = require('express');
const router = express.Router();
const StopController = require('../controllers/stopController');
const verifyToken = require('../utils/Verify');

router.post('/add', verifyToken, StopController.addStop);
router.get('/', verifyToken, StopController.getAllStops);
router.get('/:locationId', verifyToken, StopController.getAllStopsByLocation);
router.put('/:locationId/:stopId', verifyToken, StopController.updateStop);

module.exports = router;
