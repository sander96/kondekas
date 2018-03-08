var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  text: {
    et: String,
    en: String
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports.Review = mongoose.model('Review', reviewSchema);