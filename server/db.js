var mongoose = require('mongoose');
var uri = 'mongodb://localhost/kondekas';

if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGOLAB_URI;
}

mongoose.connect(uri);
var db = mongoose.connection;

db.on('open', function () {
  console.log('Mongoose connected to ' + uri);
});

db.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});