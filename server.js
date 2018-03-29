const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const https = require('https');
const app = express();
const session = require("express-session");
const fs = require('fs');

require('./server/db');

const passport = require('passport');
require('./server/config/authStrategies');

if (process.env.NODE_ENV === 'production') {
  app.use(function (req, res, next) {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect('https://' + req.headers.host + req.url);
    } else {
      next();
    }
  });
}

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use(session({
  secret: "123", // "very secure" secret
  cookie: {
    maxAge: 10 * 60 * 1000 // 10 minutes
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// API location
app.use('/api', api);

// Bootstrap CDN fallback
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// Static files
app.use('/img', express.static(__dirname + '/public/images'));
app.use(express.static('public'))

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';

var options = {
  key: fs.readFileSync('./certs/localhost-key.pem'),
  cert: fs.readFileSync('./certs/localhost-cert.pem'),
  ca: [
    fs.readFileSync('./certs/EE_Certification_Centre_Root_CA.pem.crt'),
    fs.readFileSync('./certs/ESTEID-SK_2015.pem.crt')
  ],
  requestCert: true,
  rejectUnauthorized: true
};

const httpServer = http.createServer(app).listen(port);
const httpsServer = https.createServer(options, app).listen(443);

httpServer.on('error', function (err) {
  console.log('http server error: ' + err);
});

httpsServer.on('error', function (err) {
  console.log('https server error: ' + err);
});