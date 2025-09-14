const Bus = require('../models/Bus')
const Travels = require('../models/Travels')
const Location = require('../models/Locations')
const moment = require('moment')

exports.preloadSeats = async (req, res) => {

  const rideDate = moment("13-09-2025", "DD-MM-YYYY").toDate();
  await appendRideWithSeats(rideDate);
  console.log("completed")
  
}

// AC Sleeper: L1...Ln (lower), U1...Un (upper)
function generateSleeperSeats(lowerCount, upperCount) {
  const seats = [];
  for (let i = 1; i <= lowerCount; i++) {
    seats.push({ seatNumber: `L${i}`, type: "lower" });
  }
  for (let i = 1; i <= upperCount; i++) {
    seats.push({ seatNumber: `U${i}`, type: "upper" });
  }
  return seats;
}

// Seater Bus: S1...Sn (all same type)
function generateSeaterSeats(total) {
  return Array.from({ length: total }, (_, i) => ({
    seatNumber: `S${i + 1}`,
    type: "seater",
  }));
}

async function appendRideWithSeats(rideDateStr) {
  const buses = await Bus.find({ "rides.date": { $ne: rideDateStr } });

  for (const bus of buses) {
    let seats = [];

    switch (bus.modelType) {
      case 1:
        seats = generateSleeperSeats(18, 18); // 40 total
        break;
      case 2:
        seats = generateSeaterSeats(36); // 30 total
        break;
      case 3:
        seats = generateSleeperSeats(30, 18);
        break;
      default:
        seats = generateSleeperSeats(18, 18); // fallback
    }

    await Bus.updateOne(
      { _id: bus._id },
      {
        $push: {
          rides: {
            date: rideDateStr, // stored as "dd-mm-yyyy"
            seats,
          },
        },
      }
    );
  }
}




