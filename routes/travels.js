const express = require('express');
const router = express.Router();
const travelsController = require('../controllers/travelsController');

router.post('/add', travelsController.addTravels);
router.get('/', travelsController.getAllTravels);
router.get('/:locationId', travelsController.getAllTravelsByLocation);
router.put('/:locationId/:travelsId', travelsController.updateTravels);

module.exports = router;
