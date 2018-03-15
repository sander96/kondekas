var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
}));


module.exports.sendEmail = function (address, name) {
  var mailOptions = {
    from: process.env.EMAIL,
    to: address,
    subject: 'Kondekas - Web Application Development course',
    text: 'Hello ' + name + ', this is an automated message from kondekas.'
  };

  transporter.sendMail(mailOptions);
}