const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

imageSchema.plugin(AutoIncrement, { inc_field: 'imagesId' });

module.exports = mongoose.model('Images', imageSchema);