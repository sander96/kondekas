var mongoose = require('mongoose');

var categoryComponentSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
    lowercase: true
  },
  name: {
    et: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  }
});

var categorySchema = new mongoose.Schema({
  parentCategory: categoryComponentSchema,
  subcategories: [{
    type: categoryComponentSchema
  }]
});

module.exports.Category = mongoose.model('Category', categorySchema);
module.exports.CategoryComponent = mongoose.model('CategoryComponent', categoryComponentSchema);