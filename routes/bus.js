const express = require('express');
const router = express.Router();
const BusController = require('../controllers/busController');
const verifyToken = require('../utils/Verify');

router.post('/add', verifyToken, BusController.addBus);
router.get('/', verifyToken, BusController.getAllBuses); 
router.post('/search', verifyToken, BusController.searchBuses); 
router.post('/book', verifyToken, BusController.bookSeats); 
router.get('/seats', verifyToken, BusController.getSeatsForBusAndDate); 

module.exports = router;
