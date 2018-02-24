var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user')
var bcrypt = require('bcrypt');

function checkPassword(password, hash, done, user) {
  bcrypt.compare(password, hash, function (err, same) {
    if (err) {
      return done(err);
    }

    if (same) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}

passport.use('local', new LocalStrategy({
    usernameField: 'email'
  },
  function (email, password, done) {
    User.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      checkPassword(password, user.password, done, user);
    });
  }
));