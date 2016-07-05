const jawboneRequestHelpers = require('../lib/jawboneRequestHelpers');
const utils = require('../lib/utils');
const moment = require('moment');

const updateJawboneData = (req, res) => {
  // Get parameters from request
  const userid = req.query.id;
  const accessToken = req.query.accessToken;
  // Convert start and end dates unto unix time for the API request
  const startDate = moment(req.query.startDate).unix();
  const endDate = moment(req.query.endDate).add(1, 'days').unix();
  const auth = `Bearer ${accessToken}`;

  const weightReqUrl = `https://jawbone.com/nudge/api/v.1.1/users/@me/body_events?start_time=${startDate}&end_time=${endDate}`;
  const activitiesReqUrl = `https://jawbone.com/nudge/api/v.1.1/users/@me/moves?start_time=${startDate}&end_time=${endDate}`;
  const sleepReqUrl = `https://jawbone.com/nudge/api/v.1.1/users/@me/sleeps?start_time=${startDate}&end_time=${endDate}`;
  const hrReqUrl = `https://jawbone.com/nudge/api/v.1.1/users/@me/heartrates?start_time=${startDate}&end_time=${endDate}`;

  // Send out API requests and subsequently insert data into database
  const sendActivities = (cb) => utils.sendRequest(activitiesReqUrl, auth, res, userid, jawboneRequestHelpers.insertActivities, cb);
  const sendSleep = (cb) => utils.sendRequest(sleepReqUrl, auth, res, userid, jawboneRequestHelpers.insertSleep, cb);
  const sendHR = (cb) => utils.sendRequest(hrReqUrl, auth, res, userid, jawboneRequestHelpers.insertHR, cb);
  const sendWeight = (cb) => utils.sendRequest(weightReqUrl, auth, res, userid, jawboneRequestHelpers.insertWeight, cb);

  // Put API requests and database insertions in queue
  const syncTasks = [sendActivities, sendSleep, sendHR, sendWeight];
  const callback = () => console.log('Inserted all items into database');
  syncTasks.push((cb) => {
    utils.findUserInfo(userid, startDate, endDate, res, 1);
    cb();
  });
  // Call each function in sequence
  utils.syncMap(syncTasks, callback, []);
};

const retrieveJawboneData = (req, res) => {
  // Get parameters from request
  const userid = req.query.id;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  // Get user's info from database for given parameters
  utils.findUserInfo(userid, startDate, endDate, res, 0);
};

module.exports = { updateJawboneData, retrieveJawboneData };
