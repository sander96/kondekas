module.exports.sendEmail = function (address, name) {
  var mailgun = require('mailgun-js')({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });

  var data = {
    from: 'Kondekas <kondekas@mailgun.org>',
    to: address,
    subject: 'Kondekas - Web Application Development course',
    text: 'Hello ' + name + ', this is an automated message from kondekas.'
  };

  mailgun.messages().send(data);
}