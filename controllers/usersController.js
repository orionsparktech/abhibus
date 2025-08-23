const User = require('../models/user')

exports.signup = async (req, res) => {

    if(req.body.email == null || req.body.email == "")
        return res.json({"msg": "Email is required"})
    if(req.body.password == null || req.body.password == "")
        return res.json({"msg": "Password is required"})
    if(req.body.name == null || req.body.name == "")
        return res.json({"msg": "Name is required"})

    var user = await new User({
        name: req.body.name,
        password: req.body.password,
        name: req.body.name
    });

    if(user.save()){
        res.status(200).json(user);
    }else{
        res.status(400).json({"msg": "something went wrong in saving data"})
    }
   
};

exports.signin = async (req, res) => {

    if(req.body.email == null || req.body.email == "")
            return res.json({"msg": "Email is required"})
    if(req.body.type == null || req.body.type == "")
            return res.json({"msg": "type is required"})

    if(req.body.type != "google"){
        if(req.body.password == null || req.body.password == "")
            return res.json({"msg": "password is required"})
    }

    var myuser = await User.findOne({email: req.body.email});
    console.log(myuser)

    if(myuser){
        res.status(200).json(myuser)
    }else{
        res.json({"msg": "user not found"})
    }
};