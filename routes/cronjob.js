const express = require('express');
const router = express.Router();
const cronController = require('../controllers/CronController');

router.get('/', cronController.preloadSeats);

module.exports = router;
