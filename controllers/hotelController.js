const Hotel = require('../models/Hotel')

exports.addHotel = async (req, res) => {

    var url = req.body.url;
    var name = req.body.name;
    var off = req.body.off;
    var locationId = req.body.locationId;
    var ratings = req.body.ratings;
    var ratingspeople = req.body.ratingspeople;
    var originalprice = req.body.originalprice;
    var price = req.body.price;

    if(!url || !name || !locationId || !ratings || !ratingspeople || !originalprice || !price)
        return res.status(400).json({"msg": "Data is required"})


    var myHotel = await new Hotel({
        url: url,
        name: name,
        off: off,
        locationId: locationId,
        ratings: ratings,
        ratingspeople: ratingspeople,
        originalprice: originalprice,
        price: price
    });

    if(myHotel.save()){
        
        var checkHotel1 = await Hotel.findOne({"name": name});
        if(checkHotel1){
            res.status(200).json(checkHotel1);
        }else{
            res.status(200).json(myHotel);
        }
        
    }else{
        res.status(400).json({"msg": "something went wrong in saving data"})
    }
        
        
    

   
};

exports.getAllHotels = async (req, res) => {

    var allHotels = await Hotel.find();

    if(allHotels)
        return res.status(200).json(allHotels);
    else
        return res.status(400).json({"msg": "No Hotels Found"})
};