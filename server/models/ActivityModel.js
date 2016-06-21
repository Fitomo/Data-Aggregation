const db = require('../config/db.js');

const Activity = db.Model.extend({

  tableName: 'activities',
  hasTimestamps: true,

});

module.exports = Activity;
