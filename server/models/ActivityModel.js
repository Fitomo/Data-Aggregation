const db = require('../config/db');

const Activity = db.Model.extend({

  tableName: 'activities',
  hasTimestamps: true,

});

module.exports = Activity;
