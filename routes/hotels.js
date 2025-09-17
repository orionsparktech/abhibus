const express = require('express');
const router = express.Router();
const HotelController = require('../controllers/hotelController');

router.post('/add', HotelController.addHotel);
router.get('/', HotelController.getAllHotels); 

module.exports = router;