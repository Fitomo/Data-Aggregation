const jawboneRequestHelpers = require('../lib/jawboneRequestHelpers');
const utils = require('../lib/utils');

const getJawboneData = (req, res) => {
  // const userid = req.query.user_id
  // const accessToken = req.query.accessToken;
  // const startDate = req.query.startDate;
  // const endDate = req.query.endDate;
  // const auth = 'Bearer', accessToken;

  // date needs to be in yyyyMMdd format

  // ****** UDPATE THESE ONCE YOU ACTUALLY GET EXTERNAL REQUESTS
  // START_TIME AND END_TIME NEED TO BE IN EPOCH TIME
  const startTime = 1466224150;
  const endTime = 1466569750;
  const userid = 1;
  const auth = 'Bearer u1r_4oEFjcHQQJPKxwCvVWS9Lrh8eW8PF-nYA3N-5RJm-gXqwHF2LXClRH9BEwm_cqtj6bMtuuJMWLqfgbkSwFECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP';
  const weightReqUrl = 'https://jawbone.com/nudge/api/v.1.1/users/@me/body_events?start_time=' + startTime + '&end_time=' + endTime;
  const activitiesReqUrl = 'https://jawbone.com/nudge/api/v.1.1/users/@me/moves?start_time=' + startTime + '&end_time=' + endTime;
  const sleepReqUrl = 'https://jawbone.com/nudge/api/v.1.1/users/@me/sleeps?start_time=' + startTime + '&end_time=' + endTime;
  const hrReqUrl = 'https://jawbone.com/nudge/api/v.1.1/users/@me/heartrates?start_time=' + startTime + '&end_time=' + endTime;

  const sendWeight = (cb) => utils.sendRequest(weightReqUrl, auth, res, userid, jawboneRequestHelpers.insertWeight, cb);
  const sendActivities = (cb) => utils.sendRequest(activitiesReqUrl, auth, res, userid, jawboneRequestHelpers.insertActivities, cb);
  const sendSleep = (cb) => utils.sendRequest(sleepReqUrl, auth, res, userid, jawboneRequestHelpers.insertSleep, cb);
  const sendHR = (cb) => utils.sendRequest(hrReqUrl, auth, res, userid, jawboneRequestHelpers.insertHR, cb);

  const syncTasks = [sendWeight, sendActivities, sendSleep, sendHR];
  // ****** WHY IS INSERT ALL COMING LAST BEHIND HR?
  const callback = () => console.log('Inserted all items into database');
  syncTasks.push((cb) => {
    setTimeout(() => {
      cb();
      utils.findUserInfo(userid, res);
    }, 100);
  });
  utils.syncMap(syncTasks, callback, []);
};

module.exports = getJawboneData;
