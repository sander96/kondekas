var mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var Product = require('../models/product').Product;
var Category = require('../models/category').Category;
var utils = require('../utils');
var validator = require('validator');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = ['public', 'images', req.params.category, req.params.subcategory, req.params.product];

    cb(null, createFolderStructure(filePath));
  },

  filename: function (req, file, cb) {
    if (file.mimetype === 'image/png') {
      setImagesProperty(req, file);
      cb(null, encodeURIComponent(file.originalname));

    } else if (file.mimetype === 'image/jpeg') {
      setImagesProperty(req, file);
      cb(null, encodeURIComponent(file.originalname));

    } else {
      cb(new Error('Wrong file type'));
    }
  }
});

function createFolderStructure(path) {
  return path.reduce((parentDir, childDir) => {
    let curDir = parentDir + encodeURIComponent(childDir) + '/';

    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir);
    }

    return curDir;

  }, '');
}

function setImagesProperty(req, file) {
  if (file.fieldname === 'thumbnail' || !req.body.images) {
    req.body.images = [];
    req.body.images.push('img/' + generateImagePath(req, file));
  } else {
    req.body.images.push('img/' + generateImagePath(req, file));
  }
}

function generateImagePath(req, file) {
  let category = encodeURIComponent(req.params.category);
  let subcategory = encodeURIComponent(req.params.subcategory);
  let product = encodeURIComponent(req.params.product);
  let image = encodeURIComponent(file.originalname);

  return category + '/' + subcategory + '/' + product + '/' + image;
}

const upload = multer({
  storage: storage
});
module.exports.cpUpload = upload.fields([{
  name: 'thumbnail',
  maxCount: 1
}, {
  name: 'uploads[]',
  maxCount: 5
}]);

function addProduct(req, res, id) {
  if (!utils.validParameters(req.body.et_name, req.body.en_name,
      req.body.et_description, req.body.en_description, req.body.images,
      req.body.price, req.body.quantity)) {
    res.status(400);
    return res.json('invalid/missing parameters');
  }

  if (!validator.isFloat(req.body.price) || !validator.isNumeric(req.body.quantity)) {
    res.status(400);
    return res.json({
      'error': 'some fields are invalid'
    });
  }

  var product = new Product({
    subcategoryId: id,
    productId: encodeURIComponent(req.params.product),
    name: {
      et: req.body.et_name,
      en: req.body.en_name
    },
    description: {
      et: req.body.et_description,
      en: req.body.en_description
    },

    images: req.body.images,
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

    var language = 'en';
    if (req.get('Accept-Language') === 'et') {
      language = 'et';
    }

    Product.aggregate([{
        $match: {
          productId: req.params.product,
          subcategoryId: subcategory
        }
      },
      {
        $project: {
          name: '$name.' + language,
          description: '$description.' + language,
          _id: 0,
          images: 1,
          price: 1,
          quantity: 1,
          quantitySold: 1,
          averageRating: 1,
          totalRatings: 1,
          productId: 1
        }
      }
    ], function (err, products) {
      if (err) {
        res.status(400);
        return res.json({
          "err": err
        });
      }

      if (products.length == 0) {
        res.status(400);
        return res.json({
          "err": "product doesn't exist"
        });
      }

      res.status(200);
      res.json(products[0]);
    });
  });
}

module.exports.getSubcategoryProducts = function (req, res) {
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

    var language = 'en';
    if (req.get('Accept-Language') === 'et') {
      language = 'et';
    }

    Product.aggregate([{
        $match: {
          subcategoryId: subcategory
        }
      },
      {
        $project: {
          name: '$name.' + language,
          description: '$description.' + language,
          subcategoryId: '$subcategoryId',
          _id: 0,
          images: 1,
          price: 1,
          quantity: 1,
          quantitySold: 1,
          averageRating: 1,
          totalRatings: 1,
          productId: 1
        }
      }
    ], function (err, products) {
      if (err) {
        res.status(400);
        return res.json({
          "err": err
        });
      }

      res.status(200);
      res.json(products);
    });
  });
}

module.exports.deleteProduct = function (req, res) {
  let noDir = false;

  try {
    rmDirectorySync(path.join('public', 'images', req.params.category,
      req.params.subcategory, req.params.productId));

  } catch (e) {
    if (e.toString().includes('ENOENT: no such file or directory')) {
      noDir = true;
    } else {
      return res.json({
        status: 'failure',
        error: e.toString(),
        msg: 'Manual product removal is required.'
      });
    }
  }

  Product.remove({
    subcategoryId: req.query.subcategoryId,
    productId: req.params.productId
  }, function (err) {
    if (err) {
      return res.json({
        status: 'failure',
        msg: err.toString()
      });
    } else {
      let responseMsg = noDir ? 'This product had no pictures' : 'All pictures were deleted';
      return res.json({
        status: 'success',
        msg: responseMsg
      });
    }
  });
};

function rmDirectorySync(pathToElement) {
  let stats = fs.statSync(pathToElement);

  if (stats.isFile()) {
    fs.unlinkSync(pathToElement);

  } else if (stats.isDirectory()) {
    let files = fs.readdirSync(pathToElement);

    files.forEach(function (file) {
      rmDirectorySync(path.join(pathToElement, file));
    });

    fs.rmdirSync(pathToElement);

  } else {
    throw pathToElement + ' is neither a directory nor a file';
  }
}