const express = require('express');
const router = express.Router();

var authentication = require('../controllers/authentication');
var passport = require('passport');

var categoryHandler = require('../controllers/categoryHandler');
var productHandler = require('../controllers/productHandler');

// User registration with email
router.post('/auth/register/email', authentication.registerEmail);

// User login with email
router.post('/auth/login/email', passport.authenticate('local'), authentication.loginSuccess);

// User registration with Google account
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile email']
}));

router.get('/auth/google/redirect', passport.authenticate('google'), function (req, res) {
  res.redirect('/');
});

// Authentication required to access the following resource
router.get('/auth/logged-in', authentication.loggedIn);

// Logout
router.get('/auth/logout', authentication.logout);

// Create new category
router.post('/category/:category', authentication.checkAuthentication, categoryHandler.createCategory);

// Create new subcategory
router.post('/category/:category/:subcategory', authentication.checkAuthentication, categoryHandler.createSubcategory);

// Read list of categories
router.get('/category', categoryHandler.getCategories);

// Update a category
router.put('/category/:category', authentication.checkAuthentication, categoryHandler.updateCategory);

// Update a subcategory
router.put('/category/:category/:subcategory', authentication.checkAuthentication, categoryHandler.updateSubcategory);

// Delete a category
router.delete('/category/:category', authentication.checkAuthentication, categoryHandler.deleteCategory);

// Delete a subcategory
router.delete('/category/:category/:subcategory', authentication.checkAuthentication, categoryHandler.deleteSubcategory);

// Read list of products
router.get('/product/:category/:subcategory', productHandler.getSubcategoryProducts);

// Add a product
router.post('/product/:category/:subcategory/:product', authentication.checkAuthentication, productHandler.createProduct);

// Get a product
router.get('/product/:category/:subcategory/:product', productHandler.getProduct);

module.exports = router;