var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user').User;
var GoogleUser = require('../models/user').GoogleUser;
var bcrypt = require('bcrypt');
var GoogleStrategy = require('passport-google-oauth20');
var email = require('../controllers/email');

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
      'accounts.userType': 'local',
      'accounts.email': email
    }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      for (var i = 0; i < user.accounts.length; ++i) {
        if (user.accounts[i].userType === 'local') {
          return checkPassword(password, user.accounts[i].password, done, user);
        }
      }
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '1',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '1',
  callbackURL: '/api/auth/google/redirect'
}, function (accessToken, refreshToken, profile, cb) {
  User.findOne({
    'accounts.userType': 'google',
    'accounts.googleId': profile.id
  }, function (err, currentUser) {
    if (err) {
      cb(err);
    }

    if (currentUser) {
      cb(err, currentUser);
    } else {
      var googleUser = new GoogleUser({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id
      });
      googleUser.save(function (err, googleUser) {
        if (err) {
          return cb(err);
        }

        var user = new User({
          accounts: [googleUser]
        });

        user.save(function (err, user) {
          if (!err && process.env.NODE_ENV === 'production') {
            email.sendEmail(googleUser.email, googleUser.name);
          }

          return cb(err, user);
        });
      });
    }
  });
}));