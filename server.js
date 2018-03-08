const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const session = require("express-session");

require('./server/db');

const passport = require('passport');
require('./server/config/authStrategies');

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
app.use(express.static('public'))

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));