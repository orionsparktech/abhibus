const mongoose = require('mongoose');

const deviceTokenSchema = new mongoose.Schema({
  userId: String,
  token: String,
});

module.exports = mongoose.model('DeviceToken', deviceTokenSchema);
