const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const busSchema = mongoose.Schema({
    travelsId: {
        type: Number
    },
    source: {
        type: Number
    },
    destination: {
        type: Number
    },
    starttime: {
        type: Date
    },
    endtime: {
        type: Date
    },
    seats: {
        type: Number
    },
    price: {
        type: Number
    },
    vehicleno: {
        type: String
    },
    modeltype: {
        type: Number
    },
    ac:{
        type: String
    },
    sleeper: {
        type: String
    },
    ratings:{
        type: String
    },
    ratingspeople:{
        type: Number
    },
    abhiassured:{
        type: String
    },
    originalprice:{
        type: Number
    },
    offer:{
        type: String
    },
    rides: [
    {
      date: { type: Date, required: true },
      seats: [
        {
          seatNumber: String,
          type: { type: String, enum: ["lower", "upper", "seater"] },
          isBooked: { type: Boolean, default: false },
          passengerName: { type: String, default: null },
          gender: { type: String, default: null },
          age: { type: String, default: null },
        },
      ],
    },
  ],
    
},
{
    timestamps: true
});



busSchema.plugin(AutoIncrement, { inc_field: 'busId' });

module.exports = mongoose.model('Buses', busSchema);