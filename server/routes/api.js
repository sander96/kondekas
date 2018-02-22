const express = require('express');
const router = express.Router();

var users = require('./users');

// User registration
router.post('/register', users.createUser);

// User authentication
router.post('/login', users.loginUser);

module.exports = router;