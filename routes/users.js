const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');

router.use('/signup', UserController.signup);
router.use('/signin', UserController.signin);

module.exports = router;
