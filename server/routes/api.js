const express = require('express');
const router = express.Router();

var authentication = require('../controllers/authentication');
var passport = require('passport');

var categoryHandler = require('../controllers/categoryHandler');

// User registration with email
router.post('/register/email', authentication.registerEmail);

// User login with email
router.post('/login/email', passport.authenticate('local'), authentication.loginSuccess);

// User registration with Google account
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile email']
}));

router.get('/auth/google/redirect', passport.authenticate('google'), function (req, res) {
  res.redirect('/');
});

// Authentication required to access the following resource
router.get('/auth-test', authentication.checkAuthentication, function (req, res) {
  res.send("Welcome " + req.user.accounts[0].email + ", only logged in users can see this message.");
});

// Logout
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// Create new category
router.post('/category/:category', authentication.checkAuthentication, categoryHandler.createCategory);

// Create new subcategory
router.post('/category/:category/:subcategory', authentication.checkAuthentication, categoryHandler.createSubcategory);

// Read list of categories
router.get('/category', categoryHandler.getCategories);

module.exports = router;