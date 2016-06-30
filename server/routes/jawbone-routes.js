const { updateJawboneData, retrieveJawboneData } = require('../controllers/JawboneController');

module.exports = (app) => {
  app.get('/api/jawbone/update', (req, res) => updateJawboneData(req, res));
  app.get('/api/jawbone/retrieve', (req, res) => retrieveJawboneData(req, res));
};
