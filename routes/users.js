const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');

router.use('/login', UserController.login);
router.use('/verify', UserController.verify);

module.exports = router;
