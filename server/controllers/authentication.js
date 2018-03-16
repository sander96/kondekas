var mongoose = require('mongoose');
var User = require('../models/user').User;
var LocalUser = require('../models/user').LocalUser;
var bcrypt = require('bcrypt');
var passport = require('passport');
var validator = require('validator');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

function saveUser(user, req, res) {
  var newUser = new User({
    accounts: [user]
  });

  newUser.save(function (err, newUser) {
    if (err) {
      res.status(400);
      res.send(err);
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
    return res.send('some fields are missing')
  }

  if (!validator.isEmail(req.body.email)) {
    res.status(400);
    return res.send('email is not correct');
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    'all_lowercase': true
  });

  req.body.name = validator.escape(req.body.name);

  bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
    if (err) {
      res.status(500);
      return res.send("something went wrong");
    }

    var user = new LocalUser({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });
    user.save(function (err, user) {
      if (err) {
        res.status(400);
        res.send("email already in use");
        return;
      }
      saveUser(user, req, res);
    });
  });
}

module.exports.loginSuccess = function (req, res) {
  return res.json({
    status: 'success'
  });
}

module.exports.loggedIn = function (req, res) {
  if (req.user) {
    res.json({
      loggedIn: true,
      role: req.user.role
    });
  } else {
    res.json({
      loggedIn: false
    });
  }
}

module.exports.logout = function (req, res) {
  req.logout();
  res.json({
    status: 'success'
  });
}