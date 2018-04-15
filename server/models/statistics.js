var mongoose = require('mongoose');

var statisticsSchema = new mongoose.Schema({
  os: {
    type: String,
    required: true
  },
  browser: {
    type: String,
    required: true
  },
  visitDate: {
    type: Date,
    default: Date.now
  }
});

module.exports.Statistics = mongoose.model('Statistics', statisticsSchema);