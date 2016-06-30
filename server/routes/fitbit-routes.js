const { updateFitbitData, retrieveFitbitData } = require('../controllers/FitbitController');

module.exports = (app) => {
  app.get('/api/fitbit/update', (req, res) => updateFitbitData(req, res));
  app.get('/api/fitbit/retrieve', (req, res) => retrieveFitbitData(req, res));
};
