var mongoose = require('mongoose');
var User = require('./../models/user')

var bcrypt = require('bcrypt');

function saveUser(hashedPassword, req, res) {
  var newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword
  });

  newUser.save(function (err, newUser) {
    if (err) {
      res.json({
        "error": err // for testing purposes only
      });
      return;
    } else {
      res.json({
        "registration worked": newUser // for testing purposes only
      });
    }
  });
};

module.exports.createUser = function (req, res) {
  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      res.json({
        "error": err // for testing purposes only
      });
      return;
    }
    saveUser(hashedPassword, req, res);
  });
}

function checkPassword(hash, req, res) {
  bcrypt.compare(req.body.password, hash, function (err, same) {

    if (err) {
      res.json({
        "error": err // for testing purposes only
      });
      return;
    }

    if (same) {
      res.json({
        "login-worked": true
      });
    } else {
      res.json({
        "login-worked": false
      });
    }
    return;
  });
}

module.exports.loginUser = function (req, res) {
  User.findOne({
    email: req.body.email
  }, 'password', function (err, hash) {

    if (err) {
      res.json({
        "error": err // for testing purposes only
      });
      return;
    }

    if (hash === null) {
      res.json({
        "login-worked": false
      });
      return;
    }

    checkPassword(hash.password, req, res);
  });
}