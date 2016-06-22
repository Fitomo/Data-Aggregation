const getJawboneData = require('../controllers/JawboneController');

module.exports = (app) => {
  app.get('/api/jawbone', (req, res) => getJawboneData(req, res));
};
