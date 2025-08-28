const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const OTPSchema = mongoose.Schema({
    userId: {
        type: String
    },
    OTP: {
        type: String
    },
    createddate: {
        type: Date,
        default: Date.now(),
        require: false    
    }

});


module.exports = mongoose.model('otps', OTPSchema);