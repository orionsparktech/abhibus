const express = require('express');
const router = express.Router();
const BusController = require('../controllers/busController');

router.post('/add', BusController.addBus);
router.get('/', BusController.getAllBuses); 
router.post('/search', BusController.searchBuses); 
router.post('/book', BusController.bookSeats); 
router.get('/seats', BusController.getSeatsForBusAndDate); 

module.exports = router;
