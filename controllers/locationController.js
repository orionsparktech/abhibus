const Location = require('../models/Locations')

exports.addLocation = async (req, res) => {

    var locationname = req.body.locationname;

    console.log(locationname)

    if(!locationname)
        return res.status(400).json({"msg": "locationname is required"})

    if(locationname){

        var checkLocation = await Location.findOne({"locationname": locationname}).lean();

        console.log(checkLocation);

        if(checkLocation){
            res.status(400).json({"msg": "Location already exist"});

        }else{
            var myLocation = await new Location({
                locationname: locationname
            });

            if(myLocation.save()){
                var checkLocation1 = await Location.findOne({"locationname": locationname}).lean();
                if(checkLocation1){
                    res.status(200).json(checkLocation1);
                }
                else{
                    res.status(200).json(myLocation);
                }
                
            }else{
                res.status(400).json({"msg": "something went wrong in saving data"})
            }
        }
        
    }

   
};

exports.getAllLocations = async (req, res) => {

    var allLocations = await Location.find();

    if(allLocations)
        return res.status(200).json(allLocations);
    else
        return res.status(400).json({"msg": "No Locations Found"})
};