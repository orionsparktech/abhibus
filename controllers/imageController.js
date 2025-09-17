const Image = require('../models/Images')

exports.addImage = async (req, res) => {

    var imageurl = req.body.url;

    if(!imageurl)
        return res.status(400).json({"msg": "imageurl is required"})


    var myImage = await new Image({
        url: imageurl
    });

    if(myImage.save()){
        var checkImage1 = await Image.findOne({"url": imageurl}).lean();
        if(checkImage1){
            res.status(200).json(checkImage1);
        }
        else{
            res.status(200).json(myImage);
        }
        
    }else{
        res.status(400).json({"msg": "something went wrong in saving data"})
    }
        
        
    

   
};

exports.getAllImages = async (req, res) => {

    var allImages = await Image.find();

    if(allImages)
        return res.status(200).json(allImages);
    else
        return res.status(400).json({"msg": "No Images Found"})
};