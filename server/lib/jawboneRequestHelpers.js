const jawboneDatabaseHelpers = require('./jawboneDatabaseHelpers');

module.exports = {
  insertActivities: (data, userid, cb) => {
    jawboneDatabaseHelpers.syncIterateThrough(data, userid, 'activities', jawboneDatabaseHelpers.insertIntoDatabase, cb);
  },

  insertSleep: (data, userid, cb) => {
    jawboneDatabaseHelpers.syncIterateThrough(data, userid, 'sleep', jawboneDatabaseHelpers.insertIntoDatabase, cb);
  },

  insertHR: (data, userid, cb) => {
    jawboneDatabaseHelpers.syncIterateThrough(data, userid, 'hr', jawboneDatabaseHelpers.insertIntoDatabase, cb);
  },

  insertWeight: (data, userid, cb) => {
    jawboneDatabaseHelpers.syncIterateThrough(data, userid, 'weight', jawboneDatabaseHelpers.insertIntoDatabase, cb);
  },
};
