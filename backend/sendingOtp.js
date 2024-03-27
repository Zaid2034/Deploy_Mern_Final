/* eslint-disable no-unused-vars */
const nodemailer=require('nodemailer');

async function sendOTP(email, otp){
    try {
        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "otpsender587@gmail.com",
                pass: "kgbz kibn coun jpwd"
            }
        });
        // Define email options
        let mailOptions = {
            from: "mdzaidali2034@gmail.com",
            to: email,
            subject: "OTP Verification",
            text: `Your OTP for email verification is: ${otp}`
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
module.exports=sendOTP