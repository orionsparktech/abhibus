const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const notificationSchema = mongoose.Schema({
    userId: {
        type: String
    },
    title: {
        type: String
    },
    body: {
        type: String
    }

}, {
    timestamps: true
});

notificationSchema.plugin(AutoIncrement, { inc_field: 'notificationId' });

module.exports = mongoose.model('Notifications', notificationSchema);