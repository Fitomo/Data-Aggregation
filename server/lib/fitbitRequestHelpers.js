const request = require('request');
const fitbitDatabaseHelpers = require('./fitbitDatabaseHelpers');

module.exports = {
  sendRequest: (url, auth, res, helper) => {
    const options = {
      url,
      method: 'GET',
      json: true,
      headers: {
        Authorization: auth,
      },
    };

    request(options, (err, response, body) => {
      if (err) {
        console.error('Error:', err);
      } else {
        helper(body);
        res.send();
      }
    });
  },

  insertDistance: (data) => {
    console.log('DISTANCE DATA IN HELPER', data);
    return data;
  },

  insertSteps: (data) => {
    console.log('STEPS DATA IN HELPER', data);
    return data;
  },


  insertCalories: (data) => {
    console.log('CALORIES DATA IN HELPER', data);
    return data;
  },

  insertSleep: (data) => {
    // data.summary.totalMinutesAsleep
    console.log('SLEEP DATA IN HELPER', data);
    console.log('asleep', data.summary.totalMinutesAsleep);
    return data;
  },

  insertHR: (data) => {
    // data['activities-heart'][0].value.restingHeartRate
    console.log('HR DATA IN HELPER', data);
    console.log('resting hr', data['activities-heart']);
    return data;
  },

  insertWeight: (data) => {
    console.log('WEIGHT DATA IN HELPER', data);
    return data;
  },
};
