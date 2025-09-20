
const DeviceToken = require("../models/DeviceToken.js");
const PushNotification = require("../models/Notification.js");
const { sendNotificationToUser } = require("../fcmservice.js");



exports.saveFCMToken = async (req, res) => {
  const { userId, token } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ error: 'userId and token are required' });
  }

  try {
    const existing = await DeviceToken.findOneAndUpdate(
      { userId },
      { token },
      { upsert: true, new: true }
    );
    return res.status(200).json({ message: 'Token registered', data: existing });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to register token' });
  }
};

/**
 * Send notification to a user
 */
exports.sendPushNotification = async (req, res) => {
  const { userId, title, body } = req.body;

  if (!userId || !title || !body) {
    return res.status(400).json({ error: 'userId, title, and body are required' });
  }

  try {
    const response = await sendNotificationToUser(userId, title, body);
    if(response){
        var myNotification = await new PushNotification({
                userId : userId,
                title : title,
                body: body
        })
        if(myNotification.save())
            return res.status(200).json({ message: 'Notification sent', response });

    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
};

exports.getAllNotifications = async (req, res) => {
    var allNotifications = await PushNotification.find({ "userId": req.userId })
    return res.status(200).json(allNotifications)
}