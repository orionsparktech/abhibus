const express = require('express');
const router = express.Router();
const AppController = require('../controllers/appController');
const verifyToken = require('../utils/Verify');

router.post('/savefcmtoken', AppController.saveFCMToken);
router.post('/sendpushnotification', AppController.sendPushNotification);
router.get('/notifications', verifyToken, AppController.getAllNotifications);

module.exports = router;
