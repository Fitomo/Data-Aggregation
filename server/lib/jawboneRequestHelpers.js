const request = require('request');
const jawboneDatabaseHelpers = require('./jawboneDatabaseHelpers');

module.exports = {
  sendRequest: (url, auth, res, date, userid, helper, cb) => {
    const options = {
      url,
      method: 'GET',
      json: true,
      date,
      headers: {
        Authorization: auth,
        Accept: 'application/json',
      },
    };

    request(options, (err, response, body) => {
      if (err) {
        console.error('Error:', err);
      } else {
        helper(body, userid, cb);
        res.send();
      }
    });
  },


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
