const express = require('express');
const router = express.Router();

// for testing purposes
var apiTest = require('./../models/db-test')

router.get('/api-test', function (req, res) {
  apiTest.apiTest(req, res);
});

router.get('/api-test/:new', function (req, res) {
  console.log(req.params.new);
  apiTest.apiTestNew(req, res);
});

module.exports = router;