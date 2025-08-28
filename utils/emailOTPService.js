require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

async function sendEmailOTP(toEmail, userid) {
    const otp = generateOTP();

    const msg = {
        to: toEmail,
        from: process.env.SENDER_EMAIL,
        subject: 'Your OTP Code',
        text: `Your verification code is: ${otp}`,
        html: `<strong>Your verification code is: ${otp}</strong>`,
    };

    try {
        await sgMail.send(msg);
        console.log(`✅ OTP ${otp} sent to ${toEmail}`);
         var saveOTP = new OTP({
                        userId: userid,
                        OTP: otp.toString()
                    });
                    console.log("saveOTP", saveOTP)
                                if(saveOTP.save()){
                    return { otp: otp.toString(), toEmail: toEmail };
        
                                }else{
                                    console.log("OTP not saved")
                    return { otp: otp.toString(), toEmail: toEmail };
        
                                }
        return otp; // You may want to store this for verification
    } catch (error) {
        console.error('❌ Error sending email:', error.response?.body || error.message);
        throw error;
    }
}

module.exports = { sendEmailOTP };
