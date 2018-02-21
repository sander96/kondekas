var mongoose = require('mongoose');
var url = 'mongodb://localhost/kondekas';

mongoose.connect(url);
var db = mongoose.connection;

db.on('open', function () {
  console.log('Mongoose connected to ' + url);
});

db.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});