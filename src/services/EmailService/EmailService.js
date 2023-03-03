require('dotenv').config();
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, 
    pass: process.env.MAIL_PASSWORD, 
  },
});

const sendMail = async (mailInfo) =>{
  let info = await transporter.sendMail(
    {
      from: process.env.MAIL_USER, // sender address
      to: mailInfo.getTo(), // list of receivers
      subject: mailInfo.getSubject(), // Subject line
      text: mailInfo.getText(), // plain text body
      // html: mailInfo.getHTML(), // html body
    },
    function (error, info) {
      if (error) {
        console.log(error);
        console.log("error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
  return info;
}

module.exports = {sendMail}