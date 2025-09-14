const Stop = require('../models/Stops')
const Location = require('../models/Locations')

exports.addStop = async (req, res) => {

    var name = req.body.name;
    var address = req.body.address;
    var contactdetails = req.body.contactdetails;
    var locationId = req.body.locationId;

    console.log(name)
    console.log(address)
    console.log(contactdetails)

    if(!name)
        return res.status(400).json({"msg": "name is required"})
    if(!address)
        return res.status(400).json({"msg": "address is required"})
    if(!contactdetails)
        return res.status(400).json({"msg": "contactdetails is required"})
    if(!locationId)
        return res.status(400).json({"msg": "locationId is required"})

    if(name){

        var checkLocation = await Location.findOne({"locationId": locationId}).lean();

        console.log(checkLocation);

        if(!checkLocation)
            res.status(400).json({"msg": "LocationId is invalid"});

        var checkStop = await Stop.findOne({"name": name}).lean();

        console.log(checkStop);

        if(checkStop){
            res.status(400).json({"msg": "Stop already exist"});

        }else{
            var myStop = await new Stop({
                name: name,
                address: address,
                contactdetails: contactdetails,
                locationId: locationId
            });

            if(myStop.save()){
                var checkStop1 = await Stop.findOne({"name": name}).lean();
                if(checkStop1){
                    res.status(200).json(checkStop1);
                }
                else{
                    res.status(200).json(myStop);
                }
                
            }else{
                res.status(400).json({"msg": "something went wrong in saving data"})
            }
        }
        
    }

   
};

exports.getAllStops = async (req, res) => {

    var allStops = await Stop.find();

    if(allStops.length != 0)
        return res.status(200).json(allStops);
    else
        return res.status(400).json({"msg": "No Stops Found"})
};

exports.getAllStopsByLocation = async (req, res) => {

    var locationId = req.params.locationId;
    
    if(!locationId)
        return res.status(400).json({"msg": "locationId is required"})

    var allStops = await Stop.find({"locationId": locationId});

    if(allStops.length != 0)
        return res.status(200).json(allStops);
    else
        return res.status(400).json({"msg": "No Stops Found"})
};

exports.updateStop = async (req, res) => {

    var locationId = req.params.locationId;
    var stopId = req.params.stopId;
    
    if(!locationId)
        return res.status(400).json({"msg": "locationId is required"})

    if(!stopId)
        return res.status(400).json({"msg": "stopId is required"})

    var myStop = await Stop.findOne({"stopId": stopId});

    if(myStop){
        var updateStopDetails = await Stop.updateOne({"stopId": stopId}, { $set: req.body });
        if(updateStopDetails)
            return res.status(200).json(updateStopDetails);
        else
            return res.status(400).json({"msg": "Stop not updated due to error"})
    }
    else
        return res.status(400).json({"msg": "No Stop Found"})
};
