var mongoose = require('mongoose');
var Product = require('../models/product').Product;
var Category = require('../models/category').Category;

function addProduct(req, res, id) {
  var product = new Product({
    subcategoryId: id,
    productId: req.params.product,
    name: {
      et: req.body.et_name,
      en: req.body.en_name
    },
    description: {
      et: req.body.et_description,
      en: req.body.en_description
    },
    images: req.body.images.split(','),
    price: req.body.price,
    quantity: req.body.quantity
  });

  product.save(function (err, product) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    }

    res.status(200);
    res.json(product);
  });
}

function getSubcategoryId(req, next) {
  Category.aggregate([{
      $match: {
        'parentCategory.path': req.params.category
      }
    }, {
      $project: {
        subcategories: 1
      }
    }, {
      $unwind: '$subcategories'
    }, {
      $match: {
        'subcategories.path': req.params.subcategory
      },
    }, {
      $project: {
        'subcategories._id': 1
      }
    }],
    function (err, result) {
      if (err || result.length == 0) {
        return next(err, null);
      }

      next(err, result[0].subcategories._id);
    });
}

module.exports.createProduct = function (req, res) {
  getSubcategoryId(req, function (err, result) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    }

    if (result == null) {
      res.status(400);
      return res.json({
        "err": "category doesn't exist"
      });
    }

    addProduct(req, res, result);
  });
}

module.exports.getProduct = function (req, res) {
  getSubcategoryId(req, function (err, subcategory) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    }

    if (subcategory == null) {
      res.status(400);
      return res.json({
        "err": "category doesn't exist"
      });
    }

    Product.findOne({
      productId: req.params.product,
      subcategoryId: subcategory
    }, {
      '_id': 0,
      '__v': 0,
      'subcategoryId': 0
    }, function (err, product) {
      if (err) {
        res.status(400);
        return res.json({
          "err": err
        });
      }

      if (product == null) {
        res.status(400);
        return res.json({
          "err": "product doesn't exist"
        });
      }

      res.status(200);
      res.json(product);
    });
  });
}