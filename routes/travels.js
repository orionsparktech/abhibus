const express = require('express');
const router = express.Router();
const travelsController = require('../controllers/travelsController');
const verifyToken = require('../utils/Verify');

router.post('/add', verifyToken, travelsController.addTravels);
router.get('/', verifyToken, travelsController.getAllTravels);
router.get('/:locationId', verifyToken, travelsController.getAllTravelsByLocation);
router.put('/:locationId/:travelsId', verifyToken, travelsController.updateTravels);

module.exports = router;
