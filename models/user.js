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
    imageurl: {
        type: String
    },
    gender: {
        type: String
    },
    dateofbirth: {
        type: String
    }

}, {
    timestamps: true
});

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('users', userSchema);