const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let filePath = ['public', 'images', req.params.category
      , req.params.subcategory, req.params.product];

    cb(null, createFolderStructure(filePath));
  },

  filename: function (req, file, cb) {
    if (file.mimetype === 'image/png') {
      setImagesProperty(req, file);
      cb(null, file.originalname + '.png');

    } else if (file.mimetype === 'image/jpeg') {
      setImagesProperty(req, file);
      cb(null, file.originalname + '.jpeg');

    } else {
      cb(new Error('Wrong file type'));
    }
  }
});

function createFolderStructure(path) {
  return path.reduce((parentDir, childDir) => {
    let curDir = parentDir + childDir + '/';

    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir);
    }

    return curDir;

  }, '');
}

function setImagesProperty(req, file) {
  if (file.fieldname === 'thumbnail') {
    req.body.images = file.originalname;
  } else {
    req.body.images += ',' + file.originalname;
  }
}

const upload = multer({ storage: storage });

var authentication = require('../controllers/authentication');
var passport = require('passport');
var authorization = require('../controllers/authorization');

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

let cpUpload = upload.fields([{name: 'thumbnail', maxCount: 1}, {name: 'uploads[]', maxCount: 5}]);
// Add a product
router.post('/product/:category/:subcategory/:product', authorization.isAuthorized(['admin', 'worker'])
    , cpUpload, productHandler.createProduct);

// Get a product
router.get('/product/:category/:subcategory/:product', productHandler.getProduct);

module.exports = router;