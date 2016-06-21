const getFitbitData = require('../controllers/FitbitController');

module.exports = (app) => {
  app.get('/api/fitbit', (req, res) => getFitbitData(req, res));
};
