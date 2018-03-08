var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  productId: {
    type: String,
    required: true,
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
  },
  description: {
    et: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  images: [{
    type: String,
    lowercase: true
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  quantitySold: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  averageRating: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: { // total number of people who have given a rating
    type: Number,
    min: 0,
    required: true,
    default: 0
  }
})

productSchema.index({
  subcategoryId: 1,
  productId: 1
}, {
  unique: true
});

module.exports.Product = mongoose.model('Product', productSchema);