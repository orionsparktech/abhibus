const Bus = require('../models/Bus')
const Travels = require('../models/Travels')
const Location = require('../models/Locations')

exports.addBus = async (req, res) => {

    var travelsId = req.body.travelsId;
    var source = req.body.source;
    var destination = req.body.destination;
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var seats = req.body.seats;
    var price = req.body.price;
    var vehicleno = req.body.vehicleno;
    var modeltype = req.body.modeltype;
    var ac = req.body.ac;
    var sleeper = req.body.sleeper;
    var ratings = req.body.ratings;
    var ratingspeople = req.body.ratingspeople;
    var abhiassured = req.body.abhiassured;
    var originalprice = req.body.originalprice;
    var offer = req.body.offer;

    if(!travelsId)
        return res.status(400).json({"msg": "travelsId is required"})
    if(!source)
        return res.status(400).json({"msg": "source is required"})
    if(!destination)
        return res.status(400).json({"msg": "destination is required"})
    if(!starttime)
        return res.status(400).json({"msg": "starttime is required"})
    if(!endtime)
        return res.status(400).json({"msg": "endtime is required"})
    if(!seats)
        return res.status(400).json({"msg": "seats is required"})
    if(!price)
        return res.status(400).json({"msg": "price is required"})
    if(!vehicleno)
        return res.status(400).json({"msg": "vehicleno is required"})
    if(!modeltype)
        return res.status(400).json({"msg": "modeltype is required"})
    if(!ac)
        return res.status(400).json({"msg": "ac is required"})
    if(!sleeper)
        return res.status(400).json({"msg": "sleeper is required"})
    if(!ratings)
        return res.status(400).json({"msg": "ratings is required"})
    if(!ratingspeople)
        return res.status(400).json({"msg": "ratingspeople is required"})
    if(!abhiassured)
        return res.status(400).json({"msg": "abhiassured is required"})
    if(!originalprice)
        return res.status(400).json({"msg": "originalprice is required"})

    var myBus = await new Bus({
        travelsId : travelsId,
        source : source,
        destination : destination,
        starttime : starttime,
        endtime : endtime,
        seats : seats,
        price : price,
        vehicleno : vehicleno,
        modeltype : modeltype,
        ac : ac,
        sleeper : sleeper,
        ratings : ratings,
        ratingspeople : ratingspeople,
        abhiassured : abhiassured,
        originalprice : originalprice,
        offer : offer
    })

    if(myBus.save()){
        return res.status(200).json(myBus);
    }else{
        return res.status(400).json({ "msg": "Error in saving data"});
    }
   
};

exports.getAllBuses = async (req, res) => {

    var allBuses = await Bus.find();

    if(allBuses)
        return res.status(200).json(allBuses);
    else
        return res.status(400).json({"msg": "No Buses Found"})
};

exports.searchBuses = async (req, res) => {

   var sourcelocation = req.body.source;  
   var destinationlocation = req.body.destination;  
   var traveldate = req.body.date;
   
   var allbuses = await Bus.aggregate([
    { $match: { "source": sourcelocation, "destination": destinationlocation } },
    {
      $lookup: {
        from: 'travels', // collection name in MongoDB
        localField: 'travelsId',
        foreignField: 'travelsId',
        as: 'travels'
      }
    },
    {
      $unwind: {
        path: '$travels',
        preserveNullAndEmptyArrays: true // in case there's no matching travel
      }
    },
    {
      $addFields: {
        travelName: '$travels.name',
        busType: {
            $switch: {
                branches: [
                {
                    case: {
                    $and: [
                        { $eq: ['$ac', "true"] },
                        { $eq: ['$sleeper', "true"] },
                        { $eq: ['$modeltype', 1] }
                    ]
                    },
                    then: 'AC Sleeper'
                },
                {
                    case: {
                    $and: [
                        { $eq: ['$ac', "true"] },
                        { $eq: ['$sleeper', "true"] },
                        { $eq: ['$modeltype', 3] }
                    ]
                    },
                    then: 'AC Sleeper (2+1)'
                },
                {
                    case: {
                    $and: [
                        { $eq: ['$ac', "true"] },
                        { $eq: ['$sleeper', "false"] },
                        { $eq: ['$modeltype', 2] }
                    ]
                    },
                    then: 'AC Seater (2+2)'
                },
                {
                    case: {
                    $and: [
                        { $eq: ['$ac', "false"] },
                        { $eq: ['$sleeper', "false"] },
                        { $eq: ['$modeltype', 2] }
                    ]
                    },
                    then: 'Non-AC Seater (2+2)'
                },
                {
                    case: {
                    $and: [
                        { $eq: ['$ac', "false"] },
                        { $eq: ['$sleeper', "true"] },
                        { $eq: ['$modeltype', 1] }
                    ]
                    },
                    then: 'Non-AC Sleeper'
                },
                {
                    case: {
                    $and: [
                        { $eq: ['$ac', "false"] },
                        { $eq: ['$sleeper', "true"] },
                        { $eq: ['$modeltype', 3] }
                    ]
                    },
                    then: 'Non-AC Sleeper/Seater (2+1)'
                },
                // Add other cases here as needed
                ],
                default: '' // or 'Unknown' or original modeltype as string
            }
        }
      }
    },
    {
    $project: {
      travels: 0 // 🔥 this removes the full joined `travels` object
    }
  }
  ]);

    if(allbuses.length != 0)
        return res.status(200).json(allbuses)
    else
        return res.status(400).json({"msg": "No Buses Found"})

};

exports.bookSeats = async (req, res) => {
  try {
    const { busId, rideDate, seats } = req.body;

    // Validate inputs
    if (!busId || !rideDate || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "Missing or invalid input." });
    }

    const bus = await Bus.findOne({"busId": busId});
    if (!bus) {
      return res.status(404).json({ message: "Bus not found." });
    }

    // Find the ride for the given date
    const ride = bus.rides.find(r =>
      new Date(r.date).toDateString() === new Date(rideDate).toDateString()
    );

    if (!ride) {
      return res.status(404).json({ message: "Ride not found for the given date." });
    }

    const alreadyBooked = [];
    const seatMap = new Map();
    seats.forEach(s => {
  seatMap.set(s.seatNumber, {
    passengerName: s.passengerName,
    gender: s.gender,
    age: s.age
  });
});

    

   const updatedSeats = ride.seats.map(seat => {
  if (seatMap.has(seat.seatNumber)) {
    if (seat.isBooked) {
      alreadyBooked.push(seat.seatNumber);
    } else {
      const passenger = seatMap.get(seat.seatNumber);
      seat.isBooked = true;
      seat.passengerName = passenger.passengerName;
      seat.gender = passenger.gender;
      seat.age = passenger.age;
    }
  }
  return seat;
});

    if (alreadyBooked.length > 0) {
      return res.status(409).json({
        message: "Some seats are already booked.",
        seats: alreadyBooked
      });
    }

    // Save the updated bus ride
    ride.seats = updatedSeats;
    await bus.save();

    res.status(200).json({
      message: "Seats booked successfully.",
      bookedSeats: seats.map(s => s.seatNumber)
    });
  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getSeatsForBusAndDate = async (req, res) => {
  try {
    const { busId, rideDate } = req.query; // or req.body if using POST

    if (!busId || !rideDate) {
      return res.status(400).json({ message: "Missing busId or rideDate" });
    }

    const bus = await Bus.findOne({"busId": busId});
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    // Find the ride on the given date
    const ride = bus.rides.find(r =>
      new Date(r.date).toDateString() === new Date(rideDate).toDateString()
    );

    if (!ride) {
      return res.status(404).json({ message: "Ride not found for the given date" });
    }

    // Return seat data
    res.status(200).json({
      message: "Seats fetched successfully",
      seats: ride.seats
    });

  } catch (err) {
    console.error("Error fetching seats:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

