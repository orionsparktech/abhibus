const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const locationSchema = mongoose.Schema({
    locationname: {
        type: String,
        required: true
    },
    createddate: {
        type: Date,
        default: Date.now()
    }

});

locationSchema.plugin(AutoIncrement, { inc_field: 'locationId' });

module.exports = mongoose.model('Location', locationSchema);