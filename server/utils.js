module.exports.validateBody = function (req, res) {
  for (var i = 2; i < arguments.length; ++i) {
    if (!arguments[i]) {
      res.status(400);
      return res.json({
        'error': 'some fields are missing'
      });
    }
  }
}