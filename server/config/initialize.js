const morgan = require('morgan');
const bodyParser = require('body-parser');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${process.env.AUTH_URL}`);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(allowCrossDomain);
};
