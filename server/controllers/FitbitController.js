const fitbitRequestHelpers = require('../lib/fitbitRequestHelpers');
const utils = require('../lib/utils');

const updateFitbitData = (req, res) => {
  // Get parameters from request
  const userid = req.query.id;
  const fitbitId = req.query.fitbit_id;
  const accessToken = req.query.accessToken;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const auth = `Bearer ${accessToken}`;

  const distanceReqUrl = `https://api.fitbit.com/1/user/${fitbitId}/activities/distance/date/${startDate}/${endDate}.json`;
  const stepsReqUrl = `https://api.fitbit.com/1/user/${fitbitId}/activities/steps/date/${startDate}/${endDate}.json`;
  const caloriesReqUrl = `https://api.fitbit.com/1/user/${fitbitId}/activities/tracker/calories/date/${startDate}/${endDate}.json`;
  const sleepReqUrl = `https://api.fitbit.com/1/user/${fitbitId}/sleep/minutesAsleep/date/${startDate}/${endDate}.json`;
  const hrReqUrl = `https://api.fitbit.com/1/user/${fitbitId}/activities/heart/date/${startDate}/${endDate}.json`;
  const weightReqUrl = `https://api.fitbit.com/1/user/${fitbitId}/body/log/weight/date/${startDate}/${endDate}.json`;

  // Send out API requests and subsequently insert data into database
  const sendDistance = (cb) => utils.sendRequest(distanceReqUrl, auth, res, userid, fitbitRequestHelpers.insertDistance, cb);
  const sendSteps = (cb) => utils.sendRequest(stepsReqUrl, auth, res, userid, fitbitRequestHelpers.insertSteps, cb);
  const sendCalories = (cb) => utils.sendRequest(caloriesReqUrl, auth, res, userid, fitbitRequestHelpers.insertCalories, cb);
  const sendSleep = (cb) => utils.sendRequest(sleepReqUrl, auth, res, userid, fitbitRequestHelpers.insertSleep, cb);
  const sendHR = (cb) => utils.sendRequest(hrReqUrl, auth, res, userid, fitbitRequestHelpers.insertHR, cb);
  const sendWeight = (cb) => utils.sendRequest(weightReqUrl, auth, res, userid, fitbitRequestHelpers.insertWeight, cb);

  // Put API requests and database insertions in queue
  const syncTasks = [sendDistance, sendSteps, sendCalories, sendSleep, sendHR, sendWeight];
  const callback = () => console.log('Inserted all items into database');
  syncTasks.push((cb) => {
    utils.findUserInfo(userid, startDate, endDate, res, 0);
    cb();
  });
  // Call each function in sequence
  utils.syncMap(syncTasks, callback, []);
};

const retrieveFitbitData = (req, res) => {
  // Get parameters from request
  const userid = req.query.id;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  // Get user's info from database for given parameters
  utils.findUserInfo(userid, startDate, endDate, res, 0);
};

module.exports = { updateFitbitData, retrieveFitbitData };
