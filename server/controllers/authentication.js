var mongoose = require('mongoose');
var User = require('../models/user')
var bcrypt = require('bcrypt');
var passport = require('passport');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports.checkAuthentication = function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(400);
    return res.send("You do not have access to this resource.");
  }
}

function saveUser(hashedPassword, req, res) {
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  newUser.save(function (err, newUser) {
    if (err) {
      res.status(400);
      res.send("email already in use");
      return;
    } else {
      req.login(newUser, function (err) {
        if (err) {
          res.status(500);
          return res.send("error");
        } else {
          res.status(200);
          return res.send("registration worked");
        }
      });
    }
  });
};

module.exports.registerEmail = function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400);
    return res.send("some fields are invalid")
  }

  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      res.status(500);
      return res.send("something went wrong");
    }
    saveUser(hashedPassword, req, res);
  });
}

module.exports.loginSuccess = function (req, res) {
  return res.send("Welcome " + req.user.email);
}