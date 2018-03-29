var mongoose = require('mongoose');

var localUser = new mongoose.Schema({
  userType: {
    type: String,
    default: 'local'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

var googleUser = new mongoose.Schema({
  userType: {
    type: String,
    default: 'google'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  }
});

var idCardUser = new mongoose.Schema({
  userType: {
    type: String,
    default: 'id-card'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  serialNumber: {
    type: String,
    required: true,
    unique: true
  }
});

var userSchema = new mongoose.Schema({
  accounts: [{
    type: mongoose.Schema.Types.Mixed,
    required: true
  }],
  role: {
    type: String,
    required: true,
    default: 'user'
  }
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.LocalUser = mongoose.model('LocalUser', localUser);
module.exports.GoogleUser = mongoose.model('GoogleUser', googleUser);
module.exports.IdCardUser = mongoose.model('IdCardUser', idCardUser);