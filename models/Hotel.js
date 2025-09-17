const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const hotelSchema = mongoose.Schema({
    url: {
        type: String
    },
    name: {
        type: String
    },
    off: {
        type: Number,
        default: 0
    },
    locationId: {
        type: Number
    },
    ratings: {
        type: Number
    },
    ratingspeople: {
        type: Number
    },
    originalprice: {
        type: Number
    },
    price: {
        type: Number
    }

}, {
    timestamps: true
});

hotelSchema.plugin(AutoIncrement, { inc_field: 'hotelId' });

module.exports = mongoose.model('Hotels', hotelSchema);