const Travels = require('../models/Travels')

exports.addTravels = async (req, res) => {

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var location = req.body.location;

    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(location)

    if(!name)
        return res.status(400).json({"msg": "name is required"})
    if(!email)
        return res.status(400).json({"msg": "email is required"})
    if(!phone)
        return res.status(400).json({"msg": "phone is required"})
    if(!location)
        return res.status(400).json({"msg": "location is required"})

    if(name){
        var checkLocation = await Travels.findOne({"locationId": location, "name": name}).lean();

        console.log(checkLocation);

        if(checkLocation)
            res.status(400).json({"msg": name +" already exists in this location"});
        else{
            var myTravels = await new Travels({
                name: name,
                email: email,
                phone: phone,
                location: location
            });

            if(myTravels.save()){
                var checkTravels = await Travels.findOne({"name": name}).lean();
                if(checkTravels){
                    res.status(200).json(checkTravels);
                }
                else{
                    res.status(200).json(myTravels);
                }
                
            }else{
                res.status(400).json({"msg": "something went wrong in saving data"})
            }
        }
        
    }

   
};

exports.getAllTravels = async (req, res) => {

    var allTravels = await Travels.find();

    if(allTravels)
        return res.status(200).json(allTravels);
    else
        return res.status(400).json({"msg": "No Travels Found"})
};

exports.getAllTravelsByLocation = async (req, res) => {

    var locationId = req.params.locationId;
    
    if(!locationId)
        return res.status(400).json({"msg": "locationId is required"})

    var allTravels = await Travels.find({"locationId": locationId});

    if(allTravels)
        return res.status(200).json(allTravels);
    else
        return res.status(400).json({"msg": "No Travels Found"})
};

exports.updateTravels = async (req, res) => {

    var locationId = req.params.locationId;
    var travelsId = req.params.travelsId;
    
    if(!locationId)
        return res.status(400).json({"msg": "locationId is required"})

    if(!travelsId)
        return res.status(400).json({"msg": "travelsId is required"})

    var myTravels = await Travels.findOne({"travelsId": travelsId});

    if(myTravels){
        var updateTravelsDetails = await Travels.updateOne({"travelsId": travelsId}, { $set: req.body });
        if(updateTravelsDetails)
            return res.status(200).json(updateTravelsDetails);
        else
            return res.status(400).json({"msg": "Travels not updated due to error"})
    }
    else
        return res.status(400).json({"msg": "No Travels Found"})
};