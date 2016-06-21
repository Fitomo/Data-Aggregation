require('babel-register');

const express = require('express');
const app = express();
const http = require('http').Server(app);

// Initial Configuration, Static Assets, & View Engine Configuration
require('./config/initialize.js')(app, express);

// Authentication Middleware: Express Sessions, Passport Strategy
require('./config/auth.js')(app);

// Fitbit Routes
require('./routes/fitbit-routes.js')(app);

// Jawbone Routes
require('./routes/jawbone-routes.js')(app);

http.listen(8000, 'localhost', () => {
  console.log('Listening on 8000...');
});
