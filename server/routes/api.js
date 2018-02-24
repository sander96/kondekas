const express = require('express');
const router = express.Router();

var authentication = require('../controllers/authentication');
var passport = require('passport');

// User registration with email
router.post('/register/email', authentication.registerEmail);

// User login with email
router.post('/login/email', passport.authenticate('local'), authentication.loginSuccess);

// Authentication required to access the following resource
router.get('/auth-test', authentication.checkAuthentication, function (req, res) {
  res.send("Welcome " + req.user.email + ", only logged in users can see this message.");
});

// Logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;