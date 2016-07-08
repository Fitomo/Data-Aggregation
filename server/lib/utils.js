const request = require('request');
const moment = require('moment');
const db = require('../config/db');
const fitbitFormatDate = (date) => date.split('-').join('');

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
      console.error('Error getting data from the API:', err);
    } else {
      helper(body, userid, cb);
    }
  });
};

const syncMap = (tasks, callback) => {
  // Function for executing functions synchronously
  if (tasks.length === 1) {
    tasks[0](() => callback());
  } else {
    tasks[0](() => {
      syncMap(tasks.slice(1), callback);
    });
  }
};

const findUserInfo = (userid, startDate, endDate, res, unix) => {
  // Convert unix times to 'YYYYMMDD' format (need to send dates in unix time for Jawbone API)
  if (unix) {
    startDate = Number(moment.unix(startDate).format('YYYYMMDD'));
    endDate = Number(moment.unix(endDate).format('YYYYMMDD'));
  } else {
    startDate = Number(fitbitFormatDate(startDate));
    endDate = Number(fitbitFormatDate(endDate));
  }
  db.knex('activities').where({ user_id: userid }).whereBetween('date', [startDate, endDate])
    .then((activities) => {
      res.send(activities);
    })
    .catch((err) => {
      console.error('Error in getting info from user', userid, err);
      res.status(500).send();
    });
};

module.exports = { sendRequest, syncMap, findUserInfo };
