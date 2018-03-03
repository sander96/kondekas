var mongoose = require('mongoose');
var Category = require('../models/category').Category;

module.exports.createCategory = function (req, res) {
  var newCategory = new Category({
    parentCategory: {
      path: req.params.category,
      name: {
        et: req.body.et_name,
        en: req.body.en_name
      }
    }
  });

  newCategory.save(function (err, newCategory) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    } else {
      res.status(201);
      return res.json(newCategory);
    }
  });
}

module.exports.createSubcategory = function (req, res) {
  Category.findOne({
    "parentCategory.path": req.params.category
  }, function (err, category) {
    if (err) {
      res.status(400);
      return res.json({
        "err": "parent category doesn't exist"
      });
    }

    var subcategory = {
      path: req.params.subcategory,
      name: {
        et: req.body.et_name,
        en: req.body.en_name
      }
    };

    category.subcategories.push(subcategory);

    category.save(function (err, newCategory) {
      if (err) {
        res.status(400);
        return res.json({
          "err": err
        });
      } else {
        res.status(201);
        return res.json(category);
      }
    });
  });
}

module.exports.getCategories = function (req, res) {
  Category.find({}).lean().exec(function (err, categories) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    } else {
      var simplifiedCategories = [];

      for (var i = 0; i < categories.length; ++i) {
        var simplifiedCategory = {};
        simplifiedCategory.path = categories[i].parentCategory.path;
        simplifiedCategory.name = categories[i].parentCategory.name.et;

        simplifiedCategory.subcategories = [];

        for (var j = 0; j < categories[i].subcategories.length; ++j) {
          simplifiedCategory.subcategories.push({
            path: categories[i].subcategories[j].path,
            name: categories[i].subcategories[j].name.et, // hardcoded to return estonian
          });
        }

        simplifiedCategories.push(simplifiedCategory);
      }

      res.status(201);
      return res.json(simplifiedCategories);
    }
  });
}

module.exports.updateCategory = function (req, res) {
  Category.findOne({
    'parentCategory.path': req.params.category
  }, function (err, category) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    }

    if (category) {
      category.parentCategory.path = req.body.path;
      category.parentCategory.name.et = req.body.et_name;
      category.parentCategory.name.en = req.body.en_name;

      category.save(function (err, updatedCategory) {
        if (err) {
          res.status(400);
          return res.json({
            "err": err
          });
        }

        res.status(200);
        return res.json(updatedCategory);
      });
    } else {
      res.status(400);
      return res.json({
        "err": "category doesn't exist"
      });
    }
  });
}

module.exports.updateSubcategory = function (req, res) {
  Category.findOne({
    'parentCategory.path': req.params.category
  }, function (err, category) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    }

    if (category) {
      for (var i = 0; i < category.subcategories.length; ++i) {
        if (category.subcategories[i].path === req.params.subcategory) {
          category.subcategories[i].path = req.body.path;
          category.subcategories[i].name.et = req.body.et_name;
          category.subcategories[i].name.en = req.body.en_name;
        }
      }

      category.save(function (err, updatedCategory) {
        if (err) {
          res.status(400);
          return res.json({
            "err": err
          });
        }

        res.status(200);
        return res.json(updatedCategory);
      });
    } else {
      res.status(400);
      return res.json({
        "err": "category doesn't exist"
      });
    }
  });
}

module.exports.deleteCategory = function (req, res) {
  Category.findOneAndRemove({
    'parentCategory.path': req.params.category
  }, function (err, category) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    }

    if (category === null) {
      res.status(400);
      return res.json({
        "err": "category doesn't exist"
      });
    }

    res.status(200);
    return res.json({
      "deleted": category
    });
  });
}

module.exports.deleteSubcategory = function (req, res) {
  Category.findOne({
    'parentCategory.path': req.params.category
  }, function (err, category) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    }

    if (category) {
      for (var i = 0; i < category.subcategories.length; ++i) {
        if (category.subcategories[i].path === req.params.subcategory) {
          category.subcategories[i].remove();
        }
      }

      category.save(function (err, updatedCategory) {
        if (err) {
          res.status(400);
          return res.json({
            "err": err
          });
        }

        res.status(200);
        return res.json(category);
      });
    } else {
      res.status(400);
      return res.json({
        "err": "category doesn't exist"
      });
    }
  });
}