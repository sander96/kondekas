const mongoose = require('mongoose');
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost/kondekas';

mongoose.connect(uri);

mongoose.connection.on('open', function () {
  console.log('Mongoose connected to ' + uri);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

module.exports = mongoose;