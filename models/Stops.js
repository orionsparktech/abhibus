const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const stopSchema = mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    contactdetails: {
        type: String
    },
    locationId:{
        type: Number
    },
    position:{
        type: Number
    },
    createddate: {
        type: Date,
        default: Date.now()
    }

});

stopSchema.plugin(AutoIncrement, { inc_field: 'stopId' });

module.exports = mongoose.model('Stops', stopSchema);