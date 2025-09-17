const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/imageController');

router.post('/add', ImageController.addImage);
router.get('/', ImageController.getAllImages); 

module.exports = router;