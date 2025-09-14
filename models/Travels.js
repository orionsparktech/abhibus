const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const travelsSchema = mongoose.Schema({
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
        default: Date.now()
    },
    busescount: {
        type: Number,
        default: 0
    },
    location: {
        type: Number
    }

});

travelsSchema.plugin(AutoIncrement, { inc_field: 'travelsId' });

module.exports = mongoose.model('Travels', travelsSchema);