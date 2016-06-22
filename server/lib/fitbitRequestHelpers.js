const fitbitDatabaseHelpers = require('./fitbitDatabaseHelpers');

module.exports = {
  insertDistance: (data, userid, cb) => {
    fitbitDatabaseHelpers.syncIterateThrough(data, userid, 'distance', 'activities-distance', fitbitDatabaseHelpers.insertIntoDatabase, cb);
  },

  insertSteps: (data, userid, cb) => {
    fitbitDatabaseHelpers.syncIterateThrough(data, userid, 'steps', 'activities-steps', fitbitDatabaseHelpers.insertIntoDatabase, cb);
  },

  insertCalories: (data, userid, cb) => {
    fitbitDatabaseHelpers.syncIterateThrough(data, userid, 'calories', 'activities-tracker-calories', fitbitDatabaseHelpers.insertIntoDatabase, cb);
  },

  insertSleep: (data, userid, cb) => {
    fitbitDatabaseHelpers.syncIterateThrough(data, userid, 'sleep', 'sleep-minutesAsleep', fitbitDatabaseHelpers.insertIntoDatabase, cb);
  },

  insertHR: (data, userid, cb) => {
    fitbitDatabaseHelpers.syncIterateThrough(data, userid, 'hr', 'activities-heart', fitbitDatabaseHelpers.insertIntoDatabase, cb);
  },

  insertWeight: (data, userid, cb) => {
    fitbitDatabaseHelpers.syncIterateThrough(data, userid, 'weight', 'weight', fitbitDatabaseHelpers.insertIntoDatabase, cb);
  },
};
