module.exports.idCardRedirect = function (req, res) {
  if (req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
    return res.redirect('https://localhost:4433/api/auth/id-card');
  }

  res.status(401);
  res.json({
    'err': 'heroku does not support id card'
  });
}