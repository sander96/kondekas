module.exports.isAuthorized = function (acceptedRoles) {
  return function (req, res, next) {
    if (req.isAuthenticated() && acceptedRoles.includes(req.user.role)) {
      next();
    } else {
      res.status(400);
      return res.send("You do not have access to this resource.");
    }
  }
}

module.exports.successResponse = function (req, res) {
  res.status(200);
  res.json({
    'status': 'success'
  });
}