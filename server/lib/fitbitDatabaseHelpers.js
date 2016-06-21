// const moment = require('moment');
// moment().format('YYYY-MM-DD')
const request = require('request');


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

  insertActivities: (data) => {
    // data.summary.distances[0].distance
    // data.summary.steps
    // data.summary.activityCalories
    // data.summary.marginalCalories??
    console.log('ACTIVITIES DATA IN HELPER', data);
    console.log('distance', data.summary.distances[0].distance);
    console.log('steps', data.summary.steps);
    console.log('calories', data.summary.activityCalories, data.summary.marginalCalories);
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
    console.log('resting hr', data['activities-heart'][0].value.restingHeartRate);
    return data;
  },
};
