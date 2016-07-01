require('babel-register');
const environment = require('dotenv');

// Load environment variables
if (process.env.NODE_ENV === 'development') {
  environment.config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  environment.config({ path: './env/production.env' });
}

const express = require('express');
const app = express();
const http = require('http').Server(app);

// Initial Configuration, Static Assets, & View Engine Configuration
require('./config/initialize.js')(app);

// Authentication Middleware: Express Sessions, Passport Strategy
require('./config/auth.js')(app);

// Fitbit Routes
require('./routes/fitbit-routes.js')(app);

// Jawbone Routes
require('./routes/jawbone-routes.js')(app);

http.listen(8000, 'localhost', () => {
  console.log('Listening on 8000...');
});
