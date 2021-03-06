const express = require('express');
const router = express.Router();
const routerIdCard = express.Router();

var authentication = require('../controllers/authentication');
var passport = require('passport');
var authorization = require('../controllers/authorization');
const idCard = require('../controllers/idCard');

var categoryHandler = require('../controllers/categoryHandler');
var productHandler = require('../controllers/productHandler');
const statisticsHandler = require('../controllers/statisticsHandler');

// User registration with email
router.post('/auth/register/email', authentication.registerEmail);

// User login with email
router.post('/auth/login/email', passport.authenticate('local'), authentication.loginSuccess);

// User registration/login with Google account
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile email']
}));

router.get('/auth/google/redirect', passport.authenticate('google'), function (req, res) {
  res.redirect('/');
});

// User registration/login with id-card
router.get('/auth/id-card', idCard.idCardRedirect);

routerIdCard.get('/auth/id-card', passport.authenticate('client-cert'), function (req, res) {
  res.redirect('https://localhost/');
});

// Authentication required to access the following resource
router.get('/auth/logged-in', authentication.loggedIn);

// Logout
router.get('/auth/logout', authentication.logout);

// Can user access admin resources
router.get('/auth/access-admin-resources', authorization.isAuthorized(['admin']), authorization.successResponse);

// Can user access worker resources
router.get('/auth/access-worker-resources', authorization.isAuthorized(['admin', 'worker']), authorization.successResponse);

// Create new category
router.post('/category/:category', authorization.isAuthorized(['admin', 'worker']), categoryHandler.createCategory);

// Create new subcategory
router.post('/category/:category/:subcategory', authorization.isAuthorized(['admin', 'worker']),
  categoryHandler.createSubcategory);

// Read list of categories
router.get('/category', categoryHandler.getCategories);

// Update a category
router.put('/category/:category', authorization.isAuthorized(['admin', 'worker']), categoryHandler.updateCategory);

// Update a subcategory
router.put('/category/:category/:subcategory', authorization.isAuthorized(['admin', 'worker']),
  categoryHandler.updateSubcategory);

// Delete a category
router.delete('/category/:category', authorization.isAuthorized(['admin', 'worker']), categoryHandler.deleteCategory);

// Delete a subcategory
router.delete('/category/:category/:subcategory', authorization.isAuthorized(['admin', 'worker']),
  categoryHandler.deleteSubcategory);

// Read list of products
router.get('/product/:category/:subcategory', productHandler.getSubcategoryProducts);

// Add a product
router.post('/product/:category/:subcategory/:product', authorization.isAuthorized(['admin', 'worker']),
  productHandler.cpUpload, productHandler.createProduct);

// Delete a product
router.delete('/product/:category/:subcategory/:productId', authorization.isAuthorized(['admin', 'worker']),
  productHandler.deleteProduct);

// Get a product
router.get('/product/:category/:subcategory/:product', productHandler.getProduct);

// Add stats
router.post('/stats', statisticsHandler.addStats);

// Get stats
router.get('/stats', statisticsHandler.retrieveStats);

module.exports.api = router;
module.exports.idCardApi = routerIdCard;