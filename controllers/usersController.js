const User = require('../models/user')
const { sendOTPOnPhone } = require('../utils/sendOTP');
const { sendEmailOTP } = require('../utils/emailOTPService');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken')

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

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
            console.log("checkuser.userId")
            await sendOTPOnPhone("+91"+myphone, checkuser.userId);
            const accessToken = jwt.sign(checkuser, process.env.jwttoken);
            checkuser.token = accessToken
            res.status(200).json(checkuser);

        }else{
            var user = await new User({
                phone: req.body.phone,
                name: generateUsername(),
                gender: "",
                dateofbirth: "",
                imageurl: "",
                email: ""
            });

            if(user.save()){
                var checkuser1 = await User.findOne({"phone": myphone}).lean();
                if(checkuser){
                    await sendOTPOnPhone("+91"+myphone, checkuser1.userId);
                    const accessToken1 = jwt.sign(checkuser1, process.env.jwttoken);
            checkuser1.token = accessToken1
                    res.status(200).json(checkuser1);
                }
                else{
                    var sendOTP = await sendOTPOnPhone("+91"+myphone, checkuser1.userId);
                     const accessToken1 = jwt.sign(checkuser1, process.env.jwttoken);
            checkuser1.token = accessToken1
                    res.status(200).json(checkuser1);
                }
                
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
                name: generateUsername(),
                phone: "",
                gender: "",
                dateofbirth: "",
                imageurl: ""
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
            var checkOTP = await OTP.findOne({"userId": checkuser.userId}).sort({ createdAt: -1 })
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

exports.getUser = async (req, res) => {
    console.log("done")
    var myuserId = req.userId;

    if(!myuserId)
        return res.status(400).json({"msg": "userId required"})

     if(myuserId)
        var checkuser = await User.findOne({"userId": myuserId}).lean()
        if(checkuser)
            return res.status(200).json(checkuser);
        else
            return res.status(400).json({ "msg": "user not found"})


}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

exports.updateUser = async (req, res) => {

    var userId = req.userId;
    
    if(!userId)
        return res.status(400).json({"msg": "userId is required"})

    var myUser = await User.findOne({"userId": userId});
    

    try {
    if (req.file) {
        var profileImageUrl = null;
      // Prepare S3 upload params
      s3Key = `profile-images/${Date.now()}-${req.file.originalname}`;
      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: s3Key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      // Upload file to S3
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);

      // Construct public URL
      profileImageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
    } 
}catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to update profile image' });
  }
   

    if(myUser){
        if(req.file)
            var updateUserDetails = await User.updateOne({"userId": userId}, { "imageurl": profileImageUrl });
        else
            var updateUserDetails = await User.updateOne({"userId": userId}, { $set: req.body });

        if(updateUserDetails)
            return res.status(200).json(updateUserDetails);
        else
            return res.status(400).json({"msg": "User not updated due to error"})
    }
    else
        return res.status(400).json({"msg": "No User Found"})
    
}

function generateUsername() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // 7-digit number
    return 'user' + randomNumber;
}

