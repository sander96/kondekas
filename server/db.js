const mongoose = require('mongoose');
const uri = 'mongodb://localhost/kondekas';

if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGOLAB_URI;
}

mongoose.connect(uri);

mongoose.connection.on('open', function () {
  console.log('Mongoose connected to ' + uri);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

module.exports = mongoose;