var mongoose = require('mongoose');
var Category = require('../models/category').Category;
var CategoryComponent = require('../models/category').CategoryComponent;

module.exports.createCategory = function (req, res) {
  var newCategoryComp = new CategoryComponent({
    path: req.params.category,
    name: {
      et: req.body.et_name,
      en: req.body.en_name
    }
  });

  newCategoryComp.save(function (err, newCategory) {
    if (err) {
      res.status(400);
      return res.json({
        "err": err
      });
    }

    var newCategory = new Category({
      parentCategory: newCategoryComp
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

    var newSubcategory = new CategoryComponent({
      path: req.params.subcategory,
      name: {
        et: req.body.et_name,
        en: req.body.et_name
      }
    });

    newSubcategory.save(function (err, newCategory) {
      if (err) {
        res.status(400);
        return res.json({
          "err": err
        });
      }

      category.subcategories.push(newSubcategory);

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
            name: categories[i].subcategories[j].name.et,
          });
        }

        simplifiedCategories.push(simplifiedCategory);
      }

      res.status(201);
      return res.json(simplifiedCategories);
    }
  });
}