const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/imageController');
const verifyToken = require('../utils/Verify');

router.post('/add', verifyToken, ImageController.addImage);
router.get('/', verifyToken, ImageController.getAllImages); 

module.exports = router;