
require('dotenv').config();
const twilio = require('twilio');
const OTP = require('../models/OTP');

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhoneNumber = process.env.TWILIO_PHONE;

// Function to generate a 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to send OTP via SMS
async function sendOTPOnPhone(phoneNumber, userid) {
    const otp = generateOTP();

    client.messages
        .create({
            body: `Your verification code is: ${otp}`,
            from: twilioPhoneNumber,
            to: phoneNumber
        })
        .then(message => {
            console.log(`OTP sent to ${phoneNumber}: ${otp}`);
            console.log(`Message SID: ${message.sid}`);

            var saveOTP = new OTP({
                userId: userid,
                OTP: otp.toString()
            });
            console.log("saveOTP", saveOTP)
                        if(saveOTP.save()){
            return { otp: otp, sid: message.sid };

                        }else{
                            console.log("OTP not saved")
            return { otp: otp, sid: message.sid };

            }
        })
        .catch(error => {
            console.error('Error sending OTP:', error.message);
            return {"otp": "1", "sid": "2"}
        });

}

// Example usage
module.exports = { sendOTPOnPhone };// Replace with recipient's phone number
