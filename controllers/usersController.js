const User = require('../models/user')
const { sendOTPOnPhone } = require('../utils/sendOTP');
const { sendEmailOTP } = require('../utils/emailOTPService');
const OTP = require('../models/OTP');

exports.login = async (req, res) => {

    var myphone = req.body.phone;
    var myemail = req.body.email;

    console.log(myphone, myemail)

    if(myemail == "" || myphone == "")
        return res.status(400).json({"msg": "Phone/Email is required"})

console.log(myphone)
    if(myphone){
        if(myphone.length != 10)
        return res.status(400).json({"msg": "Please enter valid phone number"})
        
        var checkuser = await User.findOne({"phone": req.body.phone}).lean();

        console.log(checkuser);

        if(checkuser){
            console.log(checkuser.userId)
            var sendOTP = await sendOTPOnPhone("+91"+myphone, checkuser.userId);
            res.status(200).json(checkuser);

        }else{
            var user = await new User({
                phone: req.body.phone,
                name: generateUsername()
            });

            if(user.save()){
                var sendOTP = await sendOTPOnPhone("+91"+myphone, checkuser.userId);
                res.status(200).json(user);
            }else{
                res.status(400).json({"msg": "something went wrong in saving data"})
            }
        }
        
    }

    if(myemail){
 var checkuser = await User.findOne({"email": myemail}).lean();

        // console.log(checkuser);

        if(checkuser){
            var sendOTP = await sendEmailOTP(myemail, checkuser.userId);
            res.status(200).json(checkuser);

        }else{
            var user = await new User({
                email: myemail,
                name: generateUsername()
            });

            if(user.save()){
                var sendOTP = await sendEmailOTP(myemail, user.userId);
                res.status(200).json(user);
            }else{
                res.status(400).json({"msg": "something went wrong in saving data"})
            }
        }
        
    
    }
};

exports.verify = async (req, res) => {
    var myotp = req.body.otp;    
    var myphone = req.body.phone;    

    if(!myphone)
        return res.status(400).json({ "msg": "Phone number requried"})
    if(!myotp)
        return res.status(400).json({ "msg": "OTP requried"})

    if(myphone){
        var checkuser = await User.findOne({"phone": myphone}).lean()
        if(checkuser){
            var checkOTP = await OTP.findOne({"userId": checkuser.userId}).lean()
            if(checkOTP){
                if(checkOTP.OTP == myotp){
                    return res.status(200).json({ "msg": "OTP Verified Successfully"})
                }
                else{
                    return res.status(400).json({ "msg": "Invalid OTP"}) 
                }
            }else{
                    return res.status(400).json({ "msg": "OTP not found"})
            }
        }
    }
}

function generateUsername() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 7-digit number
    return 'user' + randomNumber;
}