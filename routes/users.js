const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');

router.post('/login', UserController.login);
router.post('/verify', UserController.verify);
router.get('/:userId', UserController.getUser);

module.exports = router;
