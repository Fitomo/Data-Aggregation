const request = require('request');
const Activity = require('../models/ActivityModel');

const sendRequest = (url, auth, res, userid, helper, cb) => {
  const options = {
    url,
    method: 'GET',
    json: true,
    headers: {
      Authorization: auth,
      Accept: 'application/json',
    },
  };

  request(options, (err, response, body) => {
    if (err) {
      // ****** HANDLE THIS ERROR
      console.error('Error:', err);
    } else {
      helper(body, userid, cb);
    }
  });
};

const syncMap = (tasks, callback) => {
  if (tasks.length === 1) {
    tasks[0](() => callback());
  } else {
    tasks[0](() => {
      syncMap(tasks.slice(1), callback);
    });
  }
};

const findUserInfo = (userid, res) => {
  Activity.where({ user_id: userid })
    .fetchAll()
    .then((activities) => res.send(activities))
    .catch((err) => {
      console.error('Error in getting info from user', userid, err);
    });
};

module.exports = { sendRequest, syncMap, findUserInfo };
