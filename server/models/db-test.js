var mongoose = require('mongoose');

var databaseTestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

var response = {
  status: 200,
  data: [],
  message: null
};

var Test = mongoose.model('DatabaseTest', databaseTestSchema);

module.exports.apiTest = function (req, res) {
  response.data = {
    name: 'testtestest'
  };
  res.json(response);
}

module.exports.apiTestNew = function (req, res) {
  var saveTest = new Test({
    firstName: req.params.new,
    lastName: 'Works'
  });

  saveTest.save(function (err, fluffy) {
    if (err)
      return console.error(err);

  });

  response.data = {
    name: req.params.new
  };
  res.json(response);
}