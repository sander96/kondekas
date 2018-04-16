const mongoose = require('mongoose');
const Statistics = require('../models/statistics').Statistics;
const utils = require('../utils');

module.exports.addStats = function (req, res) {
  if (!utils.validParameters(req.body.os, req.body.browser)) {
    res.status(400);
    return res.json('invalid/missing parameters');
  }

  const newStats = new Statistics({
    os: req.body.os,
    browser: req.body.browser
  });

  newStats.save(function (err, stats) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    } else {
      res.status(201);
      return res.json(stats);
    }
  });
}

module.exports.retrieveStats = function (req, res) {
  Statistics.find({}, {
    '_id': 0,
    '__v': 0
  }, function (err, stats) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    }

    res.status(200);
    return res.json(stats);
  });
}