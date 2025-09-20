const express = require('express');
const router = express.Router();
const HotelController = require('../controllers/hotelController');
const verifyToken = require('../utils/Verify');

router.post('/add', verifyToken, HotelController.addHotel);
router.get('/', verifyToken, HotelController.getAllHotels); 

module.exports = router;