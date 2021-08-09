const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 2525,
            secureConnection: false,
            auth: {
                user: '1cee13564b7cf0',
                pass: '420a6ae3eb950b',
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent successfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;