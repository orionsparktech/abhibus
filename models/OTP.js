const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OTPSchema = mongoose.Schema({
    userId: {
        type: String
    },
    OTP: {
        type: String
    }

},{
    timestamps: true
});


module.exports = mongoose.model('otps', OTPSchema);