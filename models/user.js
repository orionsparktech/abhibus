const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema({
    phone: {
        type: String
    },
    email: {
        type: String
    },
    name:{
        type: String
    },
    createddate: {
        type: Date,
        default: Date.now(),
        require: false
        
    }

});

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('users', userSchema);