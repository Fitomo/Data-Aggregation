require('babel-register');
const environment = require('dotenv');

const express = require('express');
const app = express();
const http = require('http').Server(app);

// Initial Configuration
require('./config/initialize.js')(app);

// Authentication Middleware: Express Sessions
require('./config/auth.js')(app);

// Fitbit Routes
require('./routes/fitbit-routes.js')(app);

// Jawbone Routes
require('./routes/jawbone-routes.js')(app);

app.listen(8000, () => {
  console.log('Listening on 8000...');
});
