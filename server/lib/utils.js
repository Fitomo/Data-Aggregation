const request = require('request');
const Activity = require('../models/ActivityModel');
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

const findUserInfo = (userid, startDate, endDate, res, epoch) => {
  if (epoch) {
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
    });
};

module.exports = { sendRequest, syncMap, findUserInfo };
