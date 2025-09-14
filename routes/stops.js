const express = require('express');
const router = express.Router();
const StopController = require('../controllers/stopController');

router.post('/add', StopController.addStop);
router.get('/', StopController.getAllStops);
router.get('/:locationId', StopController.getAllStopsByLocation);
router.put('/:locationId/:stopId', StopController.updateStop);

module.exports = router;
